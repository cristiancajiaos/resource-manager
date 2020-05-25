import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingsComponent } from './shippings.component';
import { NewShippingComponent } from './new-shipping/new-shipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewShippingComponent
  },
  {
    path: ':id',
    component: ShippingComponent
  },
  {
    path: ':id/edit',
    component: EditShippingComponent
  },
  {
    path: '',
    component: ShippingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingsRoutingModule { }
