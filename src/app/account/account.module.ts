import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [AccountComponent, ProfileComponent, AboutComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule
  ]
})
export class AccountModule { }
