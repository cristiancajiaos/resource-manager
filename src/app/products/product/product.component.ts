import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductI } from 'src/app/shared/interfaces/product-i';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: string;
  product$: Observable<ProductI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsSerivce: ProductsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.product$ = this.productsSerivce.getProduct(this.id);
      }
    });
  }

  editProduct() {
    this.router.navigate(['products', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }

}
