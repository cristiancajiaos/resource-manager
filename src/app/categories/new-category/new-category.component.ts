import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CategoryI } from './../../shared/interfaces/category-i';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  category: CategoryI;

  newCategoryForm: FormGroup;

  categoryTitle: FormControl;
  categoryDescription: FormControl;

  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.categoryTitle = new FormControl('', Validators.required);
    this.categoryDescription = new FormControl('', Validators.required);

    this.newCategoryForm = new FormGroup({
      categoryTitle: this.categoryTitle,
      categoryDescription: this.categoryDescription
    });
  }

  addCategory() {
    this.submitted = true;

    this.category = this.newCategoryForm.value;
    this.categoryService.addCategory(this.category).then(() => {
      this.router.navigate(['categories']);
      this.toastr.success('Categoría añadida exitosamente');
    }).catch(error => {
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
