import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientComponent } from './client/client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewClientComponent
  },
  {
    path: ':id',
    component: ClientComponent
  },
  {
    path: ':id/edit',
    component: EditClientComponent
  },
  {
    path: '',
    component: ClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
