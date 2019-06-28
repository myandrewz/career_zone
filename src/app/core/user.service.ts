import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ){
 }


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
       // console.log(user);
        if (user) {          
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  createUser(value, authenticated_user_uid){
    return this.db.collection('User').add({
      id:authenticated_user_uid,
      dob: value.dob,
      sex: value.sex,
      role: value.role
    });
  }
  createStudent(value, authenticated_user_uid){
    return this.db.collection('Student').add({
      id:authenticated_user_uid,
      course: value.course,
      interest: value.interest,
      email: value.email
    });
  }
  createMentor(value, authenticated_user_uid){
    return this.db.collection('Mentor').add({
      id:authenticated_user_uid,
      employer: value.employer,
      profession: value.profession,
      skills: value.skills,
      email: value.email
    });
  }
}
