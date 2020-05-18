import { Component, OnInit, ViewChild } from '@angular/core';
import { AdsService } from './ads.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdI } from '../shared/interfaces/ad-i';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  displayedColumns: string[] = ['adTitle', 'adName', 'adEmail', 'actions'];
  dataSource: MatTableDataSource<AdI> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private adService: AdsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.adService.getAllAds().subscribe(ads => {
      this.dataSource = new MatTableDataSource<AdI>(ads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  addAd() {
    this.router.navigate(['ads', 'new']);
  }

  viewAd(ad: AdI) {
    this.router.navigate(['ads', ad.id]);
  }

  editAd(ad: AdI) {
    this.router.navigate(['ads', ad.id, 'edit']);
  }

  deleteAd(ad: AdI) {
    if (confirm('¿Estás seguro de borrar este aviso? Una vez hecho esto, no puedes deshacer la acción')) {
      this.adService.deleteAd(ad).then(() => {
        this.toastr.success('Aviso borrado exitosamente');
      }).catch(error => {
        console.log(error);
        this.toastr.error(error);
      });
    }
  }
}
