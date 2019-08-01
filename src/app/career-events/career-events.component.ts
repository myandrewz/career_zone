import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { EventsService} from '../services/events/events.service';
import { UserService } from '../core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-events',
  templateUrl: './career-events.component.html',
  styleUrls: ['./career-events.component.scss']
})

@NgModule({
  imports: [
  BrowserModule, 
  NgbModule
],
})

export class CareerEventsComponent implements OnInit {
  events: any;

  constructor(
    public eventsService: EventsService,
    private router: Router,
    private toastr: ToastrService,
    public userService:UserService,
    
  ) {}

  ngOnInit() {
    this.getEventshere();
  }

  getEventshere = () =>
  this.eventsService.getEvent()
  .subscribe(res => (this.events = res));

  editEvent(doc_ID) {
    alert(doc_ID + ' edit');
  }

  viewEvent(doc_ID) {
    alert(doc_ID + ' view');

  }
  deleteEvent(doc_ID) {
    this.eventsService.deleteEvent(doc_ID)
      .then(res => {

        this.toastr.success('Events Successfully Deleted !!!', 'Notification');
        console.log(res);
      }, err => {
        this.toastr.error(err.message, 'Error', {
          enableHtml: true
        });
      });
  }
  

}
