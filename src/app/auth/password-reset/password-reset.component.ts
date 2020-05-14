import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
      email: this.email
    });
  }

  passwordReset() {
    console.log(this.passwordResetForm.value);
  }

}
