import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/shared/interfaces/user-i';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> = this.authService.afAuth.user;

  profileForm: FormGroup;

  displayName: FormControl;
  email: FormControl;

  submitted = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.displayName = new FormControl('', Validators.required);
    this.email = new FormControl({value: '', disabled: true}, Validators.required);

    this.profileForm = new FormGroup({
      displayName: this.displayName,
      email: this.email
    });

    this.authService.userData$.subscribe(user => {
      console.log(user);
      this.setInitialValues(user);
    });
  }

  setInitialValues(user: UserI) {
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email
    });
  }

  submitProfile() {
    const user: UserI = this.profileForm.value;
    this.submitted = true;

    this.authService
      .saveUserProfile(user)
      .then(() => {
        this.toastr.success('Perfil actualizado');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      })
      .finally(() => {
        this.submitted = false;
      });
  }
}
