import { Component, OnInit } from '@angular/core';
import { ShippingsService } from '../shippings.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShippingI } from 'src/app/shared/interfaces/shipping-i';

@Component({
  selector: 'app-new-shipping',
  templateUrl: './new-shipping.component.html',
  styleUrls: ['./new-shipping.component.scss']
})
export class NewShippingComponent implements OnInit {

  newShippingForm: FormGroup;

  shippingTitle: FormControl;
  shippingDescription: FormControl;

  submitted = false;

  constructor(
    private shippingsService: ShippingsService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.shippingTitle = new FormControl('', Validators.required);
    this.shippingDescription = new FormControl('', Validators.required);

    this.newShippingForm = new FormGroup({
      shippingTitle: this.shippingTitle,
      shippingDescription: this.shippingDescription
    });
  }

  addShipping() {
    this.submitted = true;
    const shipping: ShippingI = this.newShippingForm.value;
    this.shippingsService
      .addShipping(shipping)
      .then(() => {
        this.router.navigate(['shippings']);
        this.toastr.success('Método de despacho creado exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      })
      .finally(() => {
        this.submitted = false;
      });
  }

  goBack() {
    this.location.back();
  }

}
