import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user$: Observable<User> = this.authService.afAuth.user;
  registerForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  pwd = new FormControl('', [Validators.required, Validators.minLength(8)]);

  registering = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: this.email,
      pwd: this.pwd
    });
  }

  async register() {
    this.registering = true;
    const {email, pwd} = this.registerForm.value;

    try {
      const result = this.authService.register(email, pwd);
      result.then(value => {
        if (value) {
          this.toastr.success('La cuenta se creó exitosamente');
          this.router.navigate(['email-verification']);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.registering = false;
      })
    } catch (error) {
      console.log(error);
    }

  }
}
