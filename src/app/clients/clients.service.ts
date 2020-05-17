import { Injectable } from '@angular/core';
import { ClientI } from './../shared/interfaces/client-i';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private clientsCollection: AngularFirestoreCollection<ClientI>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.clientsCollection = afs.collection<ClientI>('clients');
  }

  addClient(client: ClientI) {
    return this.clientsCollection.add(client);
  }

  getAllClients(): Observable<ClientI[]> {
    return this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ClientI;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getClient(id: string): Observable<ClientI> {
    return this.afs.doc<ClientI>(`clients/${id}`).valueChanges();
  }

  editClient(client: ClientI) {
    return this.clientsCollection.doc(client.id).update(client);
  }

  deleteClient(client: ClientI) {
    return this.clientsCollection.doc(client.id).delete();
  }


}
