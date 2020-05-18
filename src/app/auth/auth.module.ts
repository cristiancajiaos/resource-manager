import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../shared/modules/form-error/form-error.module';

@NgModule({
  declarations: [SignInComponent, RegisterComponent, EmailVerificationComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule
  ]
})
export class AuthModule { }
