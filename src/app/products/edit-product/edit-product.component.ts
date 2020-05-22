import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CategoryService } from 'src/app/categories/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductI } from 'src/app/shared/interfaces/product-i';
import { CategoryI } from 'src/app/shared/interfaces/category-i';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id: string;
  product$: Observable<ProductI>;
  categories$: Observable<CategoryI[]>;

  editProductForm: FormGroup;

  productName: FormControl;
  categoryName: FormControl;
  productDescription: FormControl;

  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.productName = new FormControl('', Validators.required);
    this.categoryName = new FormControl('', Validators.required);
    this.productDescription = new FormControl('', Validators.required);

    this.editProductForm = new FormGroup({
      productName: this.productName,
      categoryName: this.categoryName,
      productDescription: this.productDescription
    });

    this.categories$ = this.categoryService.getAllCategories();

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.productsService.getProduct(this.id).subscribe(product => {
          this.setInitialValues(product);
        });
      }
    });
  }

  setInitialValues(product: ProductI) {
    this.editProductForm.patchValue(product);
  }

  editProduct() {
    this.submitted = true;

    const product: ProductI = {
      id: this.id,
      productName: this.editProductForm.value.productName,
      categoryName: this.editProductForm.value.categoryName,
      productDescription: this.editProductForm.value.productDescription
    };

    this.productsService
      .editProduct(product)
      .then(() => {
        this.router.navigate(['products']);
        this.toastr.success('Producto editado exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      }).finally(() => {
        this.submitted = false;
      });
  }

  goBack() {
    this.location.back();
  }
}
