import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
   ){
   }

   getUserNotifications(authenticated_user_uid, role){
     return this.db.collection("Notification", ref => ref.where(role, '==', authenticated_user_uid)).snapshotChanges();
   }
}
