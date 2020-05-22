import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  sections: any[] = [
    { name: "Perfil", link: ["/account/profile"] },
    { name: 'Acerca de', link: ["/account/about"]}
  ];
  constructor() {}

  ngOnInit() {}
}
