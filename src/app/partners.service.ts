import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }
  
  createPartner(value, downlord_url, authenticated_user_uid){
    return this.db.collection('Partner').add({
      created_by:authenticated_user_uid,
      name: value.name,
      link: value.link,
      downlord_url: downlord_url
    });
  }
  getPartner() { 
    return this.db.collection('Partner').snapshotChanges();
  }
  deletePartner(doc_ID) {
     return this.db.collection("Partner").doc(doc_ID).delete();
  }
}
