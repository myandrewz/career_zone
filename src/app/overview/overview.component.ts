import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import {StudentUserComponent} from '../student-user/student-user.component';
import { AngularFirestore} from "angularfire2/firestore";
import { map} from 'rxjs/operators';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
  students: any;
  students_data: any;
  mentors_data: any;
  mentors: any;
  public searchString: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.getStudents(),
    this.getMentors()
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

    getMentors() {
      this.mentors_data = this.db.collection('User', ref => ref.where('role', '==', 'mentor')).snapshotChanges().pipe(map(changes => {
      
      return changes.map(a => {
      const data: any = a.payload.doc.data();
      data.id = a.payload.doc.id;
      return data;
      });
      })
      );

      this.mentors_data.subscribe(
      res => {
      console.log(res);
      this.mentors = res;
      //this.blogs_snapshot = res;
      });
      
    }

}
