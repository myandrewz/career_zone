import { Component, OnInit } from '@angular/core';
import { map, catchError} from 'rxjs/operators';
import {FirebaseService} from '../../../services/firebase.service';
import {Router} from '@angular/router';
import { AngularFirestore} from "angularfire2/firestore";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrls: ['./student-user.component.scss']
})

export class StudentUserComponent implements OnInit{
  students: any;
  students_data :any;
  public searchString: string;
  response: any;
  is_loading: any;
  ideas; any;
  term = '';

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private db: AngularFirestore
  ) { }


 ngOnInit() {

  this.getStudents()
  this.searchStudents(event)
}


getStudents() {
  this.students_data = this.db.collection('User', ref => ref.where('role', '==', 'student')).snapshotChanges().pipe(map(changes => {

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

  deleteStudent(value){
    this.db.collection('User').doc(value).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  }

}

