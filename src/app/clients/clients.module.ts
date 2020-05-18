import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { NewClientComponent } from './new-client/new-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CdkModule } from '../shared/modules/cdk/cdk.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    NewClientComponent,
    EditClientComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    CdkModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    FormErrorModule
  ]
})
export class ClientsModule { }
