import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductI } from '../shared/interfaces/product-i';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'categoryName', 'productDescription', 'actions'];
  dataSource: MatTableDataSource<ProductI>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(products => {
      this.dataSource = new MatTableDataSource<ProductI>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addProduct() {
    this.router.navigate(['products', 'new']);
  }

  viewProduct(product: ProductI) {
    this.router.navigate(['products', product.id]);
  }

  editProduct(product: ProductI) {
    this.router.navigate(['products', product.id, 'edit']);
  }

  deleteProduct(product: ProductI) {
    if (confirm('¿Estás seguro de borrar este aviso? Una vez hecho esto, no puedes deshacer la acción.')) {
      this.productsService
        .deleteProduct(product)
        .then(() => {
          this.toastr.success('Producto eliminado exitosamente');
        })
        .catch(error => {
          console.log(error);
          this.toastr.error(error);
        });
    }
  }
}
