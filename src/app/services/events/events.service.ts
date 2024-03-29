import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }
  
  createEvent(value, downlord_url, authenticated_user_uid){
    return this.db.collection('Event').add({
      created_by:authenticated_user_uid,
      title: value.title,
      date: value.date,
      location: value.location,
      category: value.category,
      description: value.description,
      downlord_url: downlord_url
    });
  }
  getEvent() { 
    return this.db.collection('Event').snapshotChanges();
  }
  deleteEvent(doc_ID) {
     return this.db.collection("Event").doc(doc_ID).delete();
  }
  
  getCategories() { 
    return this.db.collection('Category').snapshotChanges();
  }
  createCategory(value, authenticated_user_uid){
    return this.db.collection('Category').add({
      created_by:authenticated_user_uid,
      category: value.category
    });
  }
  deleteCategory(doc_ID) {
    return this.db.collection("Category").doc(doc_ID).delete();
  }
}
