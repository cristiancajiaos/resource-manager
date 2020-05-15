import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, MatMenuModule } from '@angular/material';

const myModules = [
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatMenuModule
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
