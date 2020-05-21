import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user$: Observable<User> = this.authService.afAuth.user;
  signInForm: FormGroup;

  email = new FormControl('', Validators.required);
  pwd = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: this.email,
      pwd: this.pwd
    });
  }

  async signIn() {
    const { email, pwd } = this.signInForm.value;

    try {
      const result = this.authService.signIn(email, pwd);
      if (result && (await result).user.emailVerified) {
        this.router.navigate(['dashboard']);
        this.toastr.success('Logueado');
      } else if (result) {
        this.router.navigate(['email-verification']);
        this.toastr.success('Inicio de sesión exitoso');
        this.toastr.warning('Este correo no está verificado');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async googleSignIn() {
    try {
      await this.authService.googleSignIn();
      this.router.navigate(['dashboard']);
      this.toastr.success('Inicio de sesión con Google exitoso');
    } catch (error) {
      console.log(error);
    }
  }
}
