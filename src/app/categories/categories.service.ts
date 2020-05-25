import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { CategoryI } from '../shared/interfaces/category-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private categoriesCollection: AngularFirestoreCollection<CategoryI>;

  constructor(private afs: AngularFirestore) {
    this.categoriesCollection = afs.collection<CategoryI>('categories');
  }

  addCategory(category: CategoryI) {
    return this.categoriesCollection.add(category);
  }

  getAllCategories(): Observable<CategoryI[]> {
    return this.categoriesCollection.snapshotChanges().pipe(
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
    return this.categoriesCollection.doc(category.id).update(category);
  }

  deleteCategory(category: CategoryI) {
    return this.categoriesCollection.doc(category.id).delete();
  }
}
