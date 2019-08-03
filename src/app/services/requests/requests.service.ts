import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ){}

  sendMentorRequest(student_ID, student, mentor_ID, mentor){
    return this.db.collection('Requests').add({
      type:"request",
      student_ID:student_ID,
      student:student,
      mentor_ID:mentor_ID,
      mentor:mentor,
      status:"pending"
    });
  }

  getUserRequests(authenticated_user_uid, role_ID){
    return this.db.collection("Requests", ref => ref.where(role_ID, '==', authenticated_user_uid)).snapshotChanges();
  }

  createNotification(student_ID, student, mentor_ID, mentor){
    return this.db.collection('Notifications').add({
      type:"request",
      student_ID:student_ID,
      student:student,
      mentor_ID:mentor_ID,
      mentor:mentor,
      status:"pending"
    });
  }
}
