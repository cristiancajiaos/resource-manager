import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymethodsService } from '../paymethods.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PayMethodI } from 'src/app/shared/interfaces/pay-method-i';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-paymethod',
  templateUrl: './edit-paymethod.component.html',
  styleUrls: ['./edit-paymethod.component.scss']
})
export class EditPaymethodComponent implements OnInit {

  id: string;
  paymethod$: Observable<PayMethodI>;

  editPayMethodForm: FormGroup;

  paymethodTitle: FormControl;
  paymethodDescription: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymethodsService: PaymethodsService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.paymethodTitle = new FormControl('', Validators.required);
    this.paymethodDescription = new FormControl('', Validators.required);

    this.editPayMethodForm = new FormGroup({
      paymethodTitle: this.paymethodTitle,
      paymethodDescription: this.paymethodDescription
    });

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.paymethod$ = this.paymethodsService.getPayMethod(this.id);
        this.paymethodsService.getPayMethod(this.id).subscribe(paymethod => {
          this.setInitialValue(paymethod);
        });
      }
    });
  }

  setInitialValue(paymethod: PayMethodI) {
    this.editPayMethodForm.patchValue(paymethod);
  }

  editPayMethod() {
    const paymethod: PayMethodI = {
      id: this.id,
      paymethodTitle: this.editPayMethodForm.value.paymethodTitle,
      paymethodDescription: this.editPayMethodForm.value.paymethodDescription
    };

    this.paymethodsService
      .editPayMethod(paymethod)
      .then(() => {
        this.router.navigate(['paymethods']);
        this.toastr.success('Método de pago editado exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      });
  }

}
