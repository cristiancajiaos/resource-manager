import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  email = new FormControl('', Validators.required);
  pwd = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: this.email,
      pwd: this.pwd
    });
  }

  signIn() {
    console.log(this.signInForm.value);
  }
}
