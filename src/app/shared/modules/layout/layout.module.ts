import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { MainModule } from 'src/app/main/main.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { CdkModule } from '../cdk/cdk.module';

@NgModule({
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MainModule,
    AuthModule,
    LayoutRoutingModule,
    MaterialModule,
    CdkModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
