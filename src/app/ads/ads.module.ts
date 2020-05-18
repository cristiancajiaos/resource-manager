import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { AdComponent } from './ad/ad.component';
import { NewAdComponent } from './new-ad/new-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CdkModule } from '../shared/modules/cdk/cdk.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdsComponent, AdComponent, NewAdComponent, EditAdComponent],
  imports: [
    CommonModule,
    AdsRoutingModule,
    MaterialModule,
    CdkModule,
    LoadingModule,
    FormErrorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdsModule { }
