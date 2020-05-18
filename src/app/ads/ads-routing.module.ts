import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsComponent } from './ads.component';
import { AdComponent } from './ad/ad.component';
import { NewAdComponent } from './new-ad/new-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';

const routes: Routes = [
  {
    path: "new",
    component: NewAdComponent,
  },
  {
    path: ":id",
    component: AdComponent,
  },
  {
    path: ":id/edit",
    component: EditAdComponent,
  },
  {
    path: "",
    component: AdsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
