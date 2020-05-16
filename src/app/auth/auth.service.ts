import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthErrorService } from '../shared/services/auth-error.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData$: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    private authError: AuthErrorService
  ) {
    this.userData$ = afAuth.authState;
  }

  async register(email: string, pwd: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, pwd);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.log(error);
      this.authError.showError(error.code);
    }
  }

  async signIn(email: string, pwd: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, pwd);
      return result;
    } catch (error) {
      console.log(error);
      this.authError.showError(error.code);
    }
  }

  async signOut() {
    try {
      const result = await this.afAuth.auth.signOut();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail() {
    try {
      const result = await (this.afAuth.auth.currentUser).sendEmailVerification();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async passwordReset(email: string) {
    try {
      const result = await this.afAuth.auth.sendPasswordResetEmail(email);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
