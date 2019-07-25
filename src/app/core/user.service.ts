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
  getUserProfile(){
    return this.db.collection("User", ref => ref.where('id', '==', 234344)).snapshotChanges();
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
    if(value.role == "Student"){
      return this.db.collection('User').add({
        id:authenticated_user_uid,
        role: value.role,
        full_name: value.full_name,
        email: value.email,
        dob: value.dob,
        gender: value.gender,
        image:value.image,
        username:value.username,
        university:value.university,
        campus:value.campus,
        course:value.course,
        date_joined:value.date_joined,
        interests:value.interests,
        is_approved:value.is_approved,
        created_at:Date(),
      });
    }
    
    else{
      return this.db.collection('User').add({
        id:authenticated_user_uid,
        role: value.role,
        full_name: value.full_name,
        email: value.email,
        dob: value.dob,
        gender: value.gender,
        image:value.image,
        current_employer:value.current_employer,
        experience:value.experience,
        skills:value.skills,
        profession:value.profession,
        created_at:Date(),
      });
    }
    
  }
  
  getSkills() { 
    return this.db.collection('Skill').snapshotChanges();
  }
  createSkill(value, authenticated_user_uid){
    return this.db.collection('Skill').add({
      created_by:authenticated_user_uid,
      skill: value.skill
    });
  }
  deleteSkill(doc_ID) {
    return this.db.collection("Skill").doc(doc_ID).delete();
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
