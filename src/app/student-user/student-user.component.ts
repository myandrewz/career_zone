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
import { map} from 'rxjs/operators'
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import { AngularFirestore} from "angularfire2/firestore";


@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrls: ['./student-user.component.scss']
})

/*from CRUD example*/
export class StudentUserComponent implements OnInit{
  students: any;
  students_data :any

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private db: AngularFirestore
  ) { }


 ngOnInit() {

  this.getStudents()
  
}


getStudents() {
  this.students_data = this.db.collection('User').snapshotChanges().pipe(map(changes => {
  
  return changes.map(a => {
  const data: any = a.payload.doc.data();
  data.id = a.payload.doc.id;
  return data;
  });
  })
  );
  
  this.students_data.subscribe(
  res => {
  console.log(res);
  this.students = res;
  //this.blogs_snapshot = res;
  }
  );

  
  }



} 