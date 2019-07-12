import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import {StudentUserComponent} from '../student-user/student-user.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
