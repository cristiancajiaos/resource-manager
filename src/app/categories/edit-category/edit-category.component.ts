import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryI } from 'src/app/shared/interfaces/category-i';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
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
        this.category$ = this.categoryService.getCategory(this.id);
        this.categoryService.getCategory(this.id).subscribe(category => {
          this.setInitialValues(category);
        });
      }
    });
  }

  setInitialValues(category: CategoryI) {
    this.editCategoryForm.patchValue(category);
  }

  editCategory() {
    const category: CategoryI = {
      id: this.id,
      categoryTitle: this.editCategoryForm.value.categoryTitle,
      categoryDescription: this.editCategoryForm.value.categoryDescription
    };
    this.categoryService.editCategory(category)
      .then(() => {
        this.router.navigate(['/categories']);
        this.toastr.success('Categoría editada exitosamente');
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(error);
      });
  }

}
