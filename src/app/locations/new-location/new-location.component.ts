import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationI } from 'src/app/shared/interfaces/location-i';
import { LocationsService } from '../locations.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {

  newLocationForm: FormGroup;

  locationDirection: FormControl;
  locationState: FormControl;
  locationCity: FormControl;
  locationCountry: FormControl;

  constructor(
    private locationsService: LocationsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationDirection = new FormControl('', Validators.required);
    this.locationState = new FormControl('', Validators.required);
    this.locationCity = new FormControl('', Validators.required);
    this.locationCountry = new FormControl('', Validators.required);

    this.newLocationForm = new FormGroup({
      locationDirection: this.locationDirection,
      locationState: this.locationState,
      locationCity: this.locationCity,
      locationCountry: this.locationCountry
    });
  }

  addLocation() {
    const location: LocationI = this.newLocationForm.value;
    this.locationsService
      .addLocation(location)
      .then(() => {
        this.router.navigate(['locations']);
        this.toastr.success('Ubicación añadida exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      });
  }
}
