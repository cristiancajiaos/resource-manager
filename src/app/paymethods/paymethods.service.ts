import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PayMethodI } from '../shared/interfaces/pay-method-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymethodsService {
  private paymethodsCollection: AngularFirestoreCollection<PayMethodI>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.paymethodsCollection = afs.collection<PayMethodI>('paymethods');
  }

  addPayMethod(payMethod: PayMethodI) {
    return this.paymethodsCollection.add(payMethod);
  }

  getAllPayMethods(): Observable<PayMethodI[]> {
    return this.paymethodsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as PayMethodI;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getPayMethod(id: string): Observable<PayMethodI> {
    return this.afs.doc<PayMethodI>(`paymethods/${id}`).valueChanges();
  }

  editPayMethod(payMethod: PayMethodI) {
    return this.paymethodsCollection.doc(payMethod.id).update(payMethod);
  }

  deletePayMethod(payMethod: PayMethodI) {
    return this.paymethodsCollection.doc(payMethod.id).delete();
  }
}
