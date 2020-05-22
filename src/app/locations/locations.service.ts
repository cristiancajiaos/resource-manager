import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LocationI } from '../shared/interfaces/location-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private locationCollection: AngularFirestoreCollection<LocationI>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.locationCollection = afs.collection<LocationI>('locations');
  }

  addLocation(location: LocationI) {
    return this.locationCollection.add(location);
  }

  getAllLocations(): Observable<LocationI[]> {
    return this.locationCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as LocationI;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  getLocation(id: string): Observable<LocationI> {
    return this.afs.doc<LocationI>(`locations/${id}`).valueChanges();
  }

  editLocation(location: LocationI) {
    return this.locationCollection.doc(location.id).update(location);
  }

  deleteLocation(location: LocationI) {
    return this.locationCollection.doc(location.id).delete();
  }
}
