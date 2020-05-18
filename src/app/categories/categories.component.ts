import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { CategoryI } from './../shared/interfaces/category-i';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['categoryTitle', 'categoryDescription', 'actions'];
  dataSource: MatTableDataSource<CategoryI> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
  }

  addCategory() {
    this.router.navigate(['categories', 'new']);
  }

  editCategory(category: CategoryI) {
    this.router.navigate(['categories', category.id, 'edit']);
  }

  deleteCategory(category: CategoryI) {
    if (confirm("¿Estás seguro de eliminar esta categoría? Una vez hecho esto, no puedes deshacer la acción")) {
      this.categoryService
        .deleteCategory(category)
        .then(() => {
          this.toastr.success("Categoría eliminada exitosamente");
        })
        .catch((error) => {
          console.log(error);
          this.toastr.error(error);
        });
    }
  }
}
