import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'firebase';

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
    const {email, pwd} = this.registerForm.value;

    try {
      const result = this.authService.register(email, pwd);
      result.then(value => {
        if (value) {
          this.toastr.success("Se creó la cuenta");
          this.router.navigate(["/email-verification"]);
        }
      }).catch(error => {
        console.log(error);
       });
    } catch (error) {
      console.log(error);
    }

  }
}
