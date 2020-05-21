import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  user$: Observable<User> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  async resendEmail() {
    try {
      await this.authService.sendVerificationEmail();
      this.toastr.success("Se reenvió el correo de verificación");
    } catch (error) {
      console.log(error);
    }
  }

}
