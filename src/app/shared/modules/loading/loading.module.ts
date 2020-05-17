import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NowLoadingComponent } from './now-loading/now-loading.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    NowLoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NowLoadingComponent
  ]
})
export class LoadingModule { }
