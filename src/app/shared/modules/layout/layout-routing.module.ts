import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../../dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
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
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../../ads/ads.module").then((m) => m.AdsModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("../../../products/products.module").then((m) => m.ProductsModule),
  },
  {
    path: "account",
    loadChildren: () =>
      import("../../../account/account.module").then((m) => m.AccountModule),
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
