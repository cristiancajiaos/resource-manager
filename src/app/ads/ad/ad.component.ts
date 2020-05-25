import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AdI } from 'src/app/shared/interfaces/ad-i';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  id: string;
  ad$: Observable<AdI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adService: AdsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.ad$ = this.adService.getAd(this.id);
      }
    });
  }

  editAd() {
    this.router.navigate(['ads', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }

}
