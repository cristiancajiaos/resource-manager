import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingsService } from '../shippings.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ShippingI } from 'src/app/shared/interfaces/shipping-i';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-edit-shipping",
  templateUrl: "./edit-shipping.component.html",
  styleUrls: ["./edit-shipping.component.scss"],
})
export class EditShippingComponent implements OnInit {
  id: string;
  shipping$: Observable<ShippingI>;

  editShippingForm: FormGroup;

  shippingTitle: FormControl;
  shippingDescription: FormControl;

  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shippingsService: ShippingsService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.shippingTitle = new FormControl("", Validators.required);
    this.shippingDescription = new FormControl("", Validators.required);

    this.editShippingForm = new FormGroup({
      shippingTitle: this.shippingTitle,
      shippingDescription: this.shippingDescription,
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.shipping$ = this.shippingsService.getShipping(this.id);
        this.shippingsService.getShipping(this.id).subscribe((shipping) => {
          this.setInitialValues(shipping);
        });
      }
    });
  }

  setInitialValues(shipping: ShippingI) {
    this.editShippingForm.patchValue(shipping);
  }

  editShipping() {
    this.submitted = true;
    const shipping: ShippingI = {
      id: this.id,
      shippingTitle: this.editShippingForm.value.shippingTitle,
      shippingDescription: this.editShippingForm.value.shippingDescription
    };

    this.shippingsService
      .editShipping(shipping)
      .then(() => {
        this.router.navigate(['shippings']);
        this.toastr.success('Método de despacho editado exitosamente');
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
