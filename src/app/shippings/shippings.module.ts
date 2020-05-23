import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingsRoutingModule } from './shippings-routing.module';
import { ShippingsComponent } from './shippings.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CdkModule } from '../shared/modules/cdk/cdk.module';
import { NewShippingComponent } from './new-shipping/new-shipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';


@NgModule({
  declarations: [ShippingsComponent, NewShippingComponent, EditShippingComponent],
  imports: [
    CommonModule,
    ShippingsRoutingModule,
    MaterialModule,
    CdkModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    FormErrorModule
  ]
})
export class ShippingsModule { }
