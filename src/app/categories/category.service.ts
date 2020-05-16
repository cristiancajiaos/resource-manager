import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryI } from './../shared/interfaces/category-i';

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<CategoryI>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.categoryCollection = afs.collection<CategoryI>("categories");
  }

  addCategory(category: CategoryI) {
    return this.categoryCollection.add(category);
  }

  getAllCategories(): Observable<CategoryI[]> {
    return this.categoryCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as CategoryI;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getCategory(id: string): Observable<CategoryI> {
    return this.afs.doc<CategoryI>(`categories/${id}`).valueChanges();
  }

  editCategory(category: CategoryI) {
    return this.categoryCollection.doc(category.id).update(category);
  }

  deleteCategory(category: CategoryI) {
    return this.categoryCollection.doc(category.id).delete();
  }
}
