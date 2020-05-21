import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';
import { CdkModule } from '../shared/modules/cdk/cdk.module';
import { NewLocationComponent } from './new-location/new-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { LocationComponent } from './location/location.component';
import { LoadingModule } from '../shared/modules/loading/loading.module';


@NgModule({
  declarations: [LocationsComponent, NewLocationComponent, EditLocationComponent, LocationComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MaterialModule,
    CdkModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    LoadingModule
  ]
})
export class LocationsModule { }
