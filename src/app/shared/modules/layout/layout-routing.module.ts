import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: "categories",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./../../../categories/categories.module").then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: "clients",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../../clients/clients.module").then((m) => m.ClientsModule),
  },
  {
    path: "ads",
    loadChildren: () =>
      import("../../../ads/ads.module").then((m) => m.AdsModule),
  },
  {
    path: "foos",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./../../../foos/foos.module").then((m) => m.FoosModule),
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
