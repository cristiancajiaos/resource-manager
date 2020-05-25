import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryI } from 'src/app/shared/interfaces/category-i';
import { ProductI } from 'src/app/shared/interfaces/product-i';
import { Location } from '@angular/common';
import { CategoriesService } from 'src/app/categories/categories.service';

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

  submitted = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
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

    this.categories$ = this.categoriesService.getAllCategories();
  }

  addProduct() {
    this.submitted = true;

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
      }).finally(() => {
        this.submitted = false;
      });
  }

  goBack() {
    this.location.back();
  }
}
