import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ClientI } from 'src/app/shared/interfaces/client-i';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  id: string;
  client$: Observable<ClientI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.client$ = this.clientsService.getClient(this.id);
      }
    });
  }

  editClient() {
    this.router.navigate(['clients', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }

}
