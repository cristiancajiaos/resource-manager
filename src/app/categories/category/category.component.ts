import { Component, OnInit } from '@angular/core';

import { CategoryI } from './../../shared/interfaces/category-i';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  id: string;
  category$: Observable<CategoryI>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.category$ = this.categoryService.getCategory(this.id);
      }
    });
  }

  editCategory() {
    this.router.navigate(['categories', this.id, 'edit']);
  }

  goBack() {
    this.location.back();
  }

}
