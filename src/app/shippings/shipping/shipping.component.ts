import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingsService } from '../shippings.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ShippingI } from 'src/app/shared/interfaces/shipping-i';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  id: string;
  shipping$: Observable<ShippingI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shippingsService: ShippingsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.shipping$ = this.shippingsService.getShipping(this.id);
      }
    });
  }

  editShipping() {
    this.router.navigate(['shippings', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }
}
