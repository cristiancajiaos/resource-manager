import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ClientsService } from "./clients.service";
import { ClientI } from "../shared/interfaces/client-i";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material';

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ["clientName", "clientEmail", "clientPhone", "actions"];
  dataSource: MatTableDataSource<ClientI>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.clientService.getAllClients().subscribe((clients) => {
      this.dataSource = new MatTableDataSource<ClientI>(clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addClient() {
    this.router.navigate(['clients', 'new']);
  }

  viewClient(client: ClientI) {
    this.router.navigate(['clients', client.id]);
  }

  editClient(client: ClientI) {
    this.router.navigate(['clients', client.id, 'edit']);
  }

  deleteClient(client: ClientI) {
    if (confirm('¿Estás seguro de borrar este cliente? Una vez hecho esto, no puedes deshacer la acción')) {
      this.clientService.deleteClient(client)
        .then(() => {
          this.toastr.success('Cliente eliminado exitosamente');
        })
        .catch(error => {
          console.log(error);
          this.toastr.error(error);
        });
    }
  }
}
