import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CdkModule } from '../shared/modules/cdk/cdk.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    CdkModule,
    LoadingModule
  ]
})
export class DashboardModule { }
