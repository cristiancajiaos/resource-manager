import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule } from '@angular/material';

const myModules = [
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    myModules
  ],
  exports: [
    myModules
  ]
})
export class MaterialModule { }
