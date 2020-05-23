import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ShippingI } from '../shared/interfaces/shipping-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingsService {
  private shippingsCollection: AngularFirestoreCollection<ShippingI>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.shippingsCollection = afs.collection<ShippingI>('shippings');
  }

  addShipping(shipping: ShippingI) {
    return this.shippingsCollection.add(shipping);
  }

  getAllShippings(): Observable<ShippingI[]> {
    return this.shippingsCollection
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ShippingI;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  getShipping(id: string): Observable<ShippingI> {
    return this.afs.doc<ShippingI>(`shippings/${id}`).valueChanges();
  }

  editShipping(shipping: ShippingI) {
    return this.shippingsCollection.doc(shipping.id).update(shipping);
  }

  deleteShipping(shipping: ShippingI) {
    return this.shippingsCollection.doc(shipping.id).delete();
  }
}
