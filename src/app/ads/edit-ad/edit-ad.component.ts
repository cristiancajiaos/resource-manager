import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdsService } from '../ads.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdI } from 'src/app/shared/interfaces/ad-i';

@Component({
  selector: "app-edit-ad",
  templateUrl: "./edit-ad.component.html",
  styleUrls: ["./edit-ad.component.scss"],
})
export class EditAdComponent implements OnInit {

  id: string;
  ad$: Observable<AdI>;

  phonePattern = /\+\d{11}/;

  editAdForm: FormGroup;

  adTitle: FormControl;
  adSubtitle: FormControl;
  adDescription: FormControl;
  adName: FormControl;
  adPhone: FormControl;
  adEmail: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adService: AdsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.adTitle = new FormControl('', Validators.required);
    this.adSubtitle = new FormControl('', Validators.required);
    this.adDescription = new FormControl('', Validators.required);
    this.adName = new FormControl('', Validators.required);
    this.adPhone = new FormControl('', [Validators.required,Validators.pattern(this.phonePattern)]);
    this.adEmail = new FormControl('', [Validators.required, Validators.email]);

    this.editAdForm = new FormGroup({
      adTitle: this.adTitle,
      adSubtitle: this.adSubtitle,
      adDescription: this.adDescription,
      adName: this.adName,
      adPhone: this.adPhone,
      adEmail: this.adEmail,
    });

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.ad$ = this.adService.getAd(this.id);
        this.adService.getAd(this.id).subscribe(ad => {
          this.setInitialValue(ad);
        });
      }
    });
  }

  setInitialValue(ad: AdI) {
    this.editAdForm.patchValue(ad);
  }

  editAd() {
    const ad: AdI = {
      id: this.id,
      adTitle: this.editAdForm.value.adTitle,
      adSubtitle: this.editAdForm.value.adSubtitle,
      adDescription: this.editAdForm.value.adDescription,
      adName: this.editAdForm.value.adName,
      adPhone: this.editAdForm.value.adPhone,
      adEmail: this.editAdForm.value.adEmail
    };

    this.adService.editAd(ad).then(() => {
      this.router.navigate(['ads']);
      this.toastr.success('Aviso editado exitosamente');
    }).catch(error => {
      console.log(error);
      this.toastr.error(error);
    });
  }
}
