import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  pwd = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: this.email,
      pwd: this.pwd
    });
  }

  register() {
    console.log(this.registerForm.value);
  }
}
