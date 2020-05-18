import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AdI } from '../shared/interfaces/ad-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private adsCollection: AngularFirestoreCollection<AdI>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.adsCollection = afs.collection<AdI>('ads');
  }

  addAd(ad: AdI) {
    return this.adsCollection.add(ad);
  }

  getAd(id: string): Observable<AdI> {
    return this.afs.doc<AdI>(`ads/${id}`).valueChanges();
  }

  getAllAds(): Observable<AdI[]> {
    return this.adsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as AdI;
      const id = a.payload.doc.id;
      return { id, ...data };
    })));
  }

  editAd(ad: AdI) {
    return this.adsCollection.doc(ad.id).update(ad);
  }

  deleteAd(ad: AdI) {
    return this.adsCollection.doc(ad.id).delete();
  }
}
