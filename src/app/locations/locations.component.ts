import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LocationI } from '../shared/interfaces/location-i';
import { LocationsService } from './locations.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  displayedColumns: string[] = ['locationDirection', 'locationCity', 'locationCountry', 'actions'];
  dataSource: MatTableDataSource<LocationI>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private locationsService: LocationsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationsService.getAllLocations().subscribe(locations => {
      this.dataSource = new MatTableDataSource<LocationI>(locations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addLocation() {
    this.router.navigate(['locations', 'new']);
  }

  viewLocation(location: LocationI) {
    this.router.navigate(['locations', location.id]);
  }

  editLocation(location: LocationI) {
    this.router.navigate(['locations', location.id, 'edit']);
  }

  deleteLocation(location: LocationI) {
    if (confirm('¿Estás seguro de borrar esta ubicación? Una vez hecho esto, no puedes deshacer la acción')) {
      this.locationsService
        .deleteLocation(location)
        .then(() => {
          this.toastr.success('Ubicación eliminada exitosamente');
        })
        .catch(error => {
          console.log(error);
          this.toastr.error(error);
        });
    }
  }
}
