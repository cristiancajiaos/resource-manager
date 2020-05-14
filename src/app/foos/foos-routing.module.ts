import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoosComponent } from './foos.component';
import { FooComponent } from './foo/foo.component';
import { NewFooComponent } from './new-foo/new-foo.component';
import { EditFooComponent } from './edit-foo/edit-foo.component';

const routes: Routes = [
  { path: "new", component: NewFooComponent },
  { path: ":id", component: FooComponent },
  { path: ":id/edit", component: EditFooComponent },
  { path: "", component: FoosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoosRoutingModule { }
