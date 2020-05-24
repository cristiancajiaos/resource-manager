import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryI } from 'src/app/shared/interfaces/category-i';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id: string;
  category$: Observable<CategoryI>;

  editCategoryForm: FormGroup;

  categoryTitle: FormControl;
  categoryDescription: FormControl;

  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.categoryTitle = new FormControl('', Validators.required);
    this.categoryDescription = new FormControl('', Validators.required);

    this.editCategoryForm = new FormGroup({
      categoryTitle: this.categoryTitle,
      categoryDescription: this.categoryDescription
    });

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.category$ = this.categoriesService.getCategory(this.id);
        this.categoriesService.getCategory(this.id).subscribe(category => {
          this.setInitialValues(category);
        });
      }
    });
  }

  setInitialValues(category: CategoryI) {
    this.editCategoryForm.patchValue(category);
  }

  editCategory() {
    this.submitted = true;
    const category: CategoryI = {
      id: this.id,
      categoryTitle: this.editCategoryForm.value.categoryTitle,
      categoryDescription: this.editCategoryForm.value.categoryDescription
    };
    this.categoriesService.editCategory(category)
      .then(() => {
        this.router.navigate(['/categories']);
        this.toastr.success('Categoría editada exitosamente');
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
