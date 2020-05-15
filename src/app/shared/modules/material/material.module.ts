import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, MatMenuModule, MatSidenavModule, MatListModule } from '@angular/material';

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
  MatMenuModule,
  MatSidenavModule,
  MatListModule
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
