import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { PayMethodI } from 'src/app/shared/interfaces/pay-method-i';
import { PaymethodsService } from '../paymethods.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-paymethod',
  templateUrl: './new-paymethod.component.html',
  styleUrls: ['./new-paymethod.component.scss']
})
export class NewPaymethodComponent implements OnInit {

  newPayMethodForm: FormGroup;

  paymethodTitle: FormControl;
  paymethodDescription: FormControl;

  constructor(
    private paymethodsService: PaymethodsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.paymethodTitle = new FormControl('', Validators.required);
    this.paymethodDescription = new FormControl('', Validators.required);

    this.newPayMethodForm = new FormGroup({
      paymethodTitle: this.paymethodTitle,
      paymethodDescription: this.paymethodDescription
    });
  }

  addPayMethod() {
    const payMethod: PayMethodI = this.newPayMethodForm.value;
    
    this.paymethodsService
      .addPayMethod(payMethod)
      .then(() => {
        this.router.navigate(['paymethods']);
        this.toastr.success('Método de pago agregado exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      });
  }
}
