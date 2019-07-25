import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import {StudentUserComponent} from '../student-user/student-user.component';
import { AngularFirestore} from "angularfire2/firestore";
import { map} from 'rxjs/operators';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
  students: any;
  students_data :any;
  public searchString: string;

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
    });

    }

}
