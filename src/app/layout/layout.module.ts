import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MainModule } from '../main/main.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MainModule,
    AuthModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule { }
