import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  submitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
      email: this.email
    });
  }

  async passwordReset() {
    this.submitting = true;
    const { email } = this.passwordResetForm.value;

    try {
      const result = await this.authService.passwordReset(email);
      this.toastr.success('Se envió, a tu correo, un mensaje con instrucciones para resetear tu contraseña');
      this.submitting = false;
    } catch (error) {
      this.toastr.error(error);
      this.submitting = true;
    }
  }

}
