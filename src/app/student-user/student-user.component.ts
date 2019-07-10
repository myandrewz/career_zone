import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppComponent } from '../app.component';
import { environment } from '../../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
 import * as firebase from 'firebase/app';
import * as $ from "jquery";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}


@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrls: ['./student-user.component.scss']
})

export class StudentUserComponent {}
export var jQuery: any = window["jQuery"];

$(document).ready(function(){
  var rootRef =  firebase.database().ref().child("User");

  rootRef.on("child_added", snap => {

    var firstname = snap.child("firstname").val();
    var lastname = snap.child("lastname").val();
    var email = snap.child ("email").val();

    $("#table_body").append("<tr><td>" + firstname + "</td><td>" + lastname + "</td><td>"
     + email + "</td><td><button>Delete</button></td></tr>")  ;
})

})
