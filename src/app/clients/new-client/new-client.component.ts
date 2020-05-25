import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { ClientI } from 'src/app/shared/interfaces/client-i';
import { ClientsService } from '../clients.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.component.html",
  styleUrls: ["./new-client.component.scss"],
})
export class NewClientComponent implements OnInit {
  phonePattern = /\+\d{11}/;

  newClientForm: FormGroup;

  clientName: FormControl;
  clientEmail: FormControl;
  clientPhone: FormControl;

  submitted = false;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.clientName = new FormControl('', Validators.required);
    this.clientEmail = new FormControl('', [Validators.required, Validators.email]);
    this.clientPhone = new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]);

    this.newClientForm = new FormGroup({
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      clientPhone: this.clientPhone,
    });
  }

  addClient() {
    this.submitted = true;

    const client: ClientI = this.newClientForm.value;
    this.clientsService.addClient(client).then(() => {
      this.router.navigate(['clients']);
      this.toastr.success('Cliente añadido exitosamente');
    }, (error) => {
      console.log(error);
      this.toastr.error(error);
    }).finally(() => {
      this.submitted = false;
    });
  }

  goBack() {
    this.location.back();
  }
}
