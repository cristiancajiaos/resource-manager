import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ShippingI } from '../shared/interfaces/shipping-i';
import { ShippingsService } from './shippings.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shippings',
  templateUrl: './shippings.component.html',
  styleUrls: ['./shippings.component.scss']
})
export class ShippingsComponent implements OnInit {
  displayedColumns: string[] = ['shippingTitle', 'shippingDescription', 'actions'];
  dataSource: MatTableDataSource<ShippingI>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private shippingsService: ShippingsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.shippingsService.getAllShippings().subscribe(shippings => {
      this.dataSource = new MatTableDataSource<ShippingI>(shippings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addShipping() {
    this.router.navigate(['shippings', 'new']);
  }

  editShipping(shipping: ShippingI) {
    this.router.navigate(['shippings', shipping.id, 'edit']);
  }

  deleteShipping(shipping: ShippingI) {
    if (confirm('¿Estás seguro de borrar este método de despacho? Una vez hecho esto, no puedes deshacer la acción.')) {
      // Borrar método de despacho
    }
  }
}
