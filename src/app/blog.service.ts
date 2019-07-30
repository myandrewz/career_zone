import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {QueryFn, DocumentReference} from '@angular/fire/firestore/interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Blog} from '../app/blog';




@Injectable({
  providedIn: 'root'
})
export class BlogService {
readonly path = 'blogs';
  constructor(private afs: AngularFirestore) { }

  update(id: string, data: Partial<Blog>): Promise<void> {
    return this.afs.doc<Blog>(`${this.path}/${id}`).update(data);
  }
  remove(id: string): Promise<void> {
    return this.afs.doc<Blog>(`${this.path}/${id}`).delete();
  }

  add(data: Blog): Promise<DocumentReference> {
    return this.afs.collection<Blog>(this.path).add({...data, created: new Date()});
  }

  
  getCollection$(ref?: QueryFn): Observable<Blog[]> {
    return this.afs.collection<Blog>(this.path, ref)
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Blog;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
}
}
