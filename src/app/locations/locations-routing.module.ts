import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent } from './locations.component';
import { NewLocationComponent } from './new-location/new-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewLocationComponent
  },
  {
    path: ':id/edit',
    component: EditLocationComponent
  },
  {
    path: ':id',
    component: LocationComponent
  },
  {
    path: '',
    component: LocationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
