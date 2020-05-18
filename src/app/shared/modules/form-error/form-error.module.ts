import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorRequiredComponent } from './form-error-required/form-error-required.component';
import { FormErrorEmailComponent } from './form-error-email/form-error-email.component';
import { FormErrorPhoneComponent } from './form-error-phone/form-error-phone.component';
import { FormErrorPasswordComponent } from './form-error-password/form-error-password.component';

@NgModule({
  declarations: [
    FormErrorRequiredComponent,
    FormErrorEmailComponent,
    FormErrorPhoneComponent,
    FormErrorPasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormErrorRequiredComponent,
    FormErrorEmailComponent,
    FormErrorPhoneComponent,
    FormErrorPasswordComponent
  ]
})
export class FormErrorModule { }
