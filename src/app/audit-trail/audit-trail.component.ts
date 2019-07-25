import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore} from "angularfire2/firestore";
import { AngularFireDatabase } from '@angular/fire/database';
import {Router} from '@angular/router';


@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {


  constructor(
    private db: AngularFirestore
  ) {}

  ngOnInit() {}

}