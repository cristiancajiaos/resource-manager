import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoosRoutingModule } from './foos-routing.module';
import { FoosComponent } from './foos.component';
import { FooComponent } from './foo/foo.component';
import { NewFooComponent } from './new-foo/new-foo.component';
import { EditFooComponent } from './edit-foo/edit-foo.component';


@NgModule({
  declarations: [FoosComponent, FooComponent, NewFooComponent, EditFooComponent],
  imports: [
    CommonModule,
    FoosRoutingModule
  ]
})
export class FoosModule { }
