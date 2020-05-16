import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryComponent } from './category/category.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { NowLoadingComponent } from '../shared/components/now-loading/now-loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    NowLoadingComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
