import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [HomeComponent, NotFoundComponent, AboutComponent,],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
