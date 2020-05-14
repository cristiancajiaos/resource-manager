import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryComponent } from './category/category.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryComponent, NewCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
