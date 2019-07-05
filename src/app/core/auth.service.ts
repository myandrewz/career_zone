import { Injectable,NgZone } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { functions } from 'firebase/app';
import { auth } from 'firebase';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(
   public afAuth: AngularFireAuth,
   public router: Router, 
   public ngZone: NgZone 
 ){}


 async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
}



//  dosendWelcomeEmail = functions.auth.user().onCreate((user) => {
//   // [END onCreateTrigger]
//     // [START eventAttributes]
//     const email = user.email; // The email of the user.
//     const displayName = user.displayName; // The display name of the user.
//     // [END eventAttributes]
  
//     //return this.sendWelcomeEmail(email, displayName);
//   });


  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }





  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }


  

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }




   

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      //firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        //this.SendVerificationMail(); // Sending email verification notification, when new user registers
        resolve(res);
      }, err => reject(err))
    })
  }


  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['<!-- enter your route name here -->']);
          });
        }
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  SendVerificationMail() {
    throw new Error("Method not implemented.");
  }
  SetUserData(user: firebase.User) {
    throw new Error("Method not implemented.");
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }


}
