import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CdkModule } from '../shared/modules/cdk/cdk.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductsComponent, ProductComponent, NewProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    CdkModule,
    LoadingModule,
    FormErrorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
