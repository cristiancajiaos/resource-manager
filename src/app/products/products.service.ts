import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ProductI } from '../shared/interfaces/product-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<ProductI>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.productsCollection = afs.collection<ProductI>('products');
  }

  newProduct(product: ProductI) {
    return this.productsCollection.add(product);
  }

  getProduct(id: string): Observable<ProductI> {
    return this.afs.doc<ProductI>(`products/${id}`).valueChanges();
  }

  getAllProducts(): Observable<ProductI[]> {
    return this.productsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as ProductI;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
  }

  editProduct(product: ProductI) {
    return this.productsCollection.doc(product.id).update(product);
  }

  deleteProduct(product: ProductI) {
    return this.productsCollection.doc(product.id).delete();
  }
}
