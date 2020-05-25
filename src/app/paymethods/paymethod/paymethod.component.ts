import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymethodsService } from '../paymethods.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { PayMethodI } from 'src/app/shared/interfaces/pay-method-i';

@Component({
  selector: 'app-paymethod',
  templateUrl: './paymethod.component.html',
  styleUrls: ['./paymethod.component.scss']
})
export class PaymethodComponent implements OnInit {

  id: string;
  paymethod$: Observable<PayMethodI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymethodsSerivce: PaymethodsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.paymethod$ = this.paymethodsSerivce.getPayMethod(this.id);
      }
    });
  }

  editPayMethod() {
    this.router.navigate(['paymethods', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }

}
