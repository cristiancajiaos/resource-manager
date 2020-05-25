import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationI } from 'src/app/shared/interfaces/location-i';
import { Location } from '@angular/common';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  id: string;
  location$: Observable<LocationI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationsService: LocationsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.location$ = this.locationsService.getLocation(this.id);
      }
    });
  }

  editLocation() {
    this.router.navigate(['locations', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }
}
