import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';

const myModules = [
  LayoutModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModules
  ],
  exports: [
    myModules
  ]
})
export class CdkModule { }
