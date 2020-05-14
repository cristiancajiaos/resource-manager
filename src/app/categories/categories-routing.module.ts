import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: "new",
    component: NewCategoryComponent,
  },
  {
    path: ":id",
    component: CategoryComponent,
  },
  {
    path: ':id/edit',
    component: EditCategoryComponent
  },
  {
    path: "",
    component: CategoriesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
