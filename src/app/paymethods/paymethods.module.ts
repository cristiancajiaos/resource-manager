import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymethodsRoutingModule } from './paymethods-routing.module';
import { PaymethodsComponent } from './paymethods.component';
import { NewPaymethodComponent } from './new-paymethod/new-paymethod.component';
import { EditPaymethodComponent } from './edit-paymethod/edit-paymethod.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';
import { PaymethodComponent } from './paymethod/paymethod.component';


@NgModule({
  declarations: [PaymethodsComponent, NewPaymethodComponent, EditPaymethodComponent, PaymethodComponent],
  imports: [
    CommonModule,
    PaymethodsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    FormErrorModule
  ]
})
export class PaymethodsModule { }
