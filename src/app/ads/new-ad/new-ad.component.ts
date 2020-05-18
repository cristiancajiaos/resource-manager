import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdI } from './../../shared/interfaces/ad-i';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.scss']
})
export class NewAdComponent implements OnInit {

  phonePattern = /\+\d{11}/;

  newAdForm: FormGroup;

  adTitle: FormControl;
  adSubtitle: FormControl;
  adDescription: FormControl;
  adName: FormControl;
  adPhone: FormControl;
  adEmail: FormControl;

  constructor(
    private adService: AdsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.adTitle = new FormControl('', Validators.required);
    this.adSubtitle = new FormControl('', Validators.required);
    this.adDescription = new FormControl('', Validators.required);
    this.adName = new FormControl('', Validators.required);
    this.adPhone = new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]);
    this.adEmail = new FormControl('', [Validators.required, Validators.email]);


    this.newAdForm = new FormGroup({
      adTitle: this.adTitle,
      adSubtitle: this.adSubtitle,
      adDescription: this.adDescription,
      adName: this.adName,
      adPhone: this.adPhone,
      adEmail: this.adEmail,
    });
  }

  addAd() {
    const ad: AdI = this.newAdForm.value;
    this.adService.addAd(ad).then(() => {
      this.router.navigate(['ads']);
      this.toastr.success('Aviso creado exitosamente');
    }).catch(error => {
      console.log(error);
      this.toastr.error(error);
    });
  }

}
