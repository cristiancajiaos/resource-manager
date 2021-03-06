import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase/app';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User> = this.authService.afAuth.user;

  showMenuButton: boolean;

  menuElements: any[] = [
    { text: 'Categorias', link: ['/categories']},
    { text: 'Clientes', link: ['/clients']},
    { text: 'Avisos', link: ['/ads']},
    { text: 'Productos', link: ['/products']},
    { text: 'Ubicaciones', link: ['/locations']},
    { text: 'Medios de Pago', link: ['/paymethods']},
    { text: 'Medios de Despacho', link: ['/shippings']}
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    const breakpoints = this.breakpointObserver.observe(['(max-width:991px)']);

    breakpoints.subscribe(result => {
      this.showMenuButton = result.breakpoints['(max-width:991px)'];
    });
  }

  async signOut() {
    try {
      const result = await this.authService.signOut();
      this.router.navigate(["home"]);
      this.toastr.success("Se cerró sesión exitosamente");
    } catch (error) {
      this.toastr.error(error);
    }
  }

  goToCategories() {
    this.router.navigate(["categories"]);
  }

  goToClients() {
    this.router.navigate(['clients']);
  }

  goToAds() {
    this.router.navigate(['ads']);
  }

  goToFoos() {
    this.router.navigate(["foos"]);
  }

  goToAccount() {
    this.router.navigate(["account"]);
  }
}
