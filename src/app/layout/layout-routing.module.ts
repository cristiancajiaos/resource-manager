import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "categories",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../categories/categories.module").then((m) => m.CategoriesModule),
  },
  {
    path: "foos",
    canActivate: [AuthGuard],
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
