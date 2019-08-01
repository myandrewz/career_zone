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
}
