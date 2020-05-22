import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { LocationI } from 'src/app/shared/interfaces/location-i';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {

  id: string;
  location$: Observable<LocationI>;

  editLocationForm: FormGroup;

  locationDirection: FormControl;
  locationState: FormControl;
  locationCity: FormControl;
  locationCountry: FormControl;

  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationsService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.locationDirection = new FormControl('', Validators.required);
    this.locationState = new FormControl('', Validators.required);
    this.locationCity = new FormControl('', Validators.required);
    this.locationCountry = new FormControl('', Validators.required);

    this.editLocationForm = new FormGroup({
      locationDirection: this.locationDirection,
      locationState: this.locationState,
      locationCity: this.locationCity,
      locationCountry: this.locationCountry
    });

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.location$ = this.locationService.getLocation(this.id);
        this.locationService.getLocation(this.id).subscribe(location => {
          this.setInitialValue(location);
        });
      }
    });
  }

  setInitialValue(location: LocationI) {
    this.editLocationForm.patchValue(location);
  }

  editLocation() {
    this.submitted = true;

    const location: LocationI = {
      id: this.id,
      locationDirection: this.editLocationForm.value.locationDirection,
      locationState: this.editLocationForm.value.locationState,
      locationCity: this.editLocationForm.value.locationCity,
      locationCountry: this.editLocationForm.value.locationCountry
    };

    this.locationService
      .editLocation(location)
      .then(() => {
        this.router.navigate(['locations']);
        this.toastr.success('Ubicación editada exitosamente');
      })
      .catch(error => {
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
