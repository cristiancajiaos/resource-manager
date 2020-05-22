import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientI } from 'src/app/shared/interfaces/client-i';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.scss"],
})
export class EditClientComponent implements OnInit {

  id: string;
  client$: Observable<ClientI>;

  phonePattern = /\+\d{11}/;

  editClientForm: FormGroup;

  clientName: FormControl;
  clientEmail: FormControl;
  clientPhone: FormControl;

  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.clientName = new FormControl('', Validators.required);
    this.clientEmail = new FormControl('', [Validators.required, Validators.email]);
    this.clientPhone = new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]);

    this.editClientForm = new FormGroup({
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      clientPhone: this.clientPhone,
    });

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.client$ = this.clientService.getClient(this.id);
        this.clientService.getClient(this.id).subscribe(client => {
          this.setInitialValue(client);
        });
      }
    });
  }

  setInitialValue(client: ClientI) {
    this.editClientForm.patchValue(client);
  }

  editClient() {
    this.submitted = true;

    const client = {
      id: this.id,
      clientName: this.editClientForm.value.clientName,
      clientEmail: this.editClientForm.value.clientEmail,
      clientPhone: this.editClientForm.value.clientPhone
    };

    this.clientService.editClient(client).then(() => {
      this.router.navigate(['clients']);
      this.toastr.success('Cliente editado exitosamente');
    }).catch(error => {
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
