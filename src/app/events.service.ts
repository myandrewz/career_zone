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
  
  createEvent(value, authenticated_user_uid){
    return this.db.collection('Event').add({
      created_by:authenticated_user_uid,
      title: value.title,
      date: value.date,
      location: value.location,
      category: value.category,
      description: value.description,
      image_url: value.image
    });
  }
}
