import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymethodsComponent } from './paymethods.component';
import { NewPaymethodComponent } from './new-paymethod/new-paymethod.component';
import { EditPaymethodComponent } from './edit-paymethod/edit-paymethod.component';
import { PaymethodComponent } from './paymethod/paymethod.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewPaymethodComponent
  },
  {
    path: ':id',
    component: PaymethodComponent
  },
  {
    path: ':id/edit',
    component: EditPaymethodComponent
  },
  {
    path: '',
    component: PaymethodsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymethodsRoutingModule { }
