import { Component, OnInit } from '@angular/core';
import { map} from 'rxjs/operators'
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import { AngularFirestore} from "angularfire2/firestore";


@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  students: any;
  students_data :any;
  public searchString: string;
  response: any;
  is_loading: any;
  ideas; any;
  term = '';
  //event = '';

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.getStudents()
    this.searchStudents(event)
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
  });
  }

  searchStudents(event){
    if (event.key === "Enter"){
  console.log(this.term)
  this.db.collection('User', ref => ref.where('full_name', '==', this.term)).valueChanges().subscribe(
  res => {
  this.response = res;
  console.log(this.response);
    
  this.ideas = res;
  this.is_loading = false;
    }
    );
  }
}
}



  
