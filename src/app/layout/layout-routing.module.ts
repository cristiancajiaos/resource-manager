import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "categories",
    loadChildren: () =>
      import("../categories/categories.module").then((m) => m.CategoriesModule),
  },
  {
    path: "foos",
    loadChildren: () => import("../foos/foos.module").then((m) => m.FoosModule),
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/not-found",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
