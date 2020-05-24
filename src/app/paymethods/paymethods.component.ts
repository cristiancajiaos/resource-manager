import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PayMethodI } from '../shared/interfaces/pay-method-i';
import { PaymethodsService } from './paymethods.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paymethods',
  templateUrl: './paymethods.component.html',
  styleUrls: ['./paymethods.component.scss']
})
export class PaymethodsComponent implements OnInit {

  displayedColumns: string[] = ['paymethodTitle', 'paymethodDescription', 'actions'];
  dataSource: MatTableDataSource<PayMethodI>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private paymethodsService: PaymethodsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.paymethodsService.getAllPayMethods().subscribe(paymethods => {
      this.dataSource = new MatTableDataSource<PayMethodI>(paymethods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addPayMethod() {
    this.router.navigate(['paymethods', 'new']);
  }

  viewPayMethod(payMethod: PayMethodI) {
    this.router.navigate(['paymethods', payMethod.id]);
  }

  editPayMethod(payMethod: PayMethodI) {
    this.router.navigate(['paymethods', payMethod.id, 'edit']);
  }

  deletePayMethod(payMethod: PayMethodI) {
    if (confirm('¿Estás seguro de borrar este método de pago? Una vez hecho esto, no puedes deshacer la acción.')) {
      this.paymethodsService
        .deletePayMethod(payMethod)
        .then(() => {
          this.toastr.success('Método de pago eliminado exitosamente');
        })
        .catch(error => {
          console.log(error);
          this.toastr.error(error);
        });
    }
  }
}
