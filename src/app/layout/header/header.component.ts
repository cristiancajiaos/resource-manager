import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  async signOut() {
    try {
      const result = await this.authService.signOut();
      this.router.navigate(['/home']);
      this.toastr.success('Deslogueado');
    } catch (error) {
      this.toastr.error(error);
    }
  }
}
