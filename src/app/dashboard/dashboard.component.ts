import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AuthService } from '../auth/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  cols: number;
  user$: Observable<User> = this.authService.afAuth.user;

  sections: any[] = [
    { text: "Categorias", link: "categories" },
    { text: "Clientes", link: "clients" },
    { text: "Avisos", link: "ads" },
    { text: "Productos", link: "products" },
  ];

  constructor(
    private authService: AuthService,
    private breakpoints: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    const breakpoints = this.breakpoints.observe(['(max-width:991px)']);

    breakpoints.subscribe(result => {
      this.cols = result.breakpoints['(max-width:991px)'] ? 1 : 2;
    });
  }

  goToSection(section: string) {
    this.router.navigate([section]);
  }
}
