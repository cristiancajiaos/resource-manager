import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CategoryService } from 'src/app/categories/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryI } from 'src/app/shared/interfaces/category-i';
import { ProductI } from 'src/app/shared/interfaces/product-i';

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
})
export class NewProductComponent implements OnInit {
  categories$: Observable<CategoryI[]>;

  newProductForm: FormGroup;

  productName: FormControl;
  categoryName: FormControl;
  productDescription: FormControl;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productName = new FormControl("", Validators.required);
    this.categoryName = new FormControl("", Validators.required);
    this.productDescription = new FormControl("", Validators.required);

    this.newProductForm = new FormGroup({
      productName: this.productName,
      categoryName: this.categoryName,
      productDescription: this.productDescription,
    });

    this.categories$ = this.categoryService.getAllCategories();
  }

  addProduct() {
    const product: ProductI = this.newProductForm.value;
    this.productsService
      .newProduct(product)
      .then(() => {
        this.router.navigate(['products']);
        this.toastr.success('Producto creado exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      });
  }
}
