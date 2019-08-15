import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { EventsService} from '../services/events/events.service';
import { UserService } from '../core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@NgModule({
  imports: [
  BrowserModule, 
  NgbModule
],
  //declarations: [NgbdCarouselBasic],
  //exports: [NgbdCarouselBasic],
  //bootstrap: [NgbdCarouselBasic]
})
export class HomeComponent {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  events: any;
  mentors:any;
  authenticated_user: any;
  

  constructor(
    public eventsService: EventsService,
    private router: Router,
    private toastr: ToastrService,
    public userService:UserService,
    
  ) {}

  ngOnInit() {
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
    this.getMentor("mentor");
    
    this.getEventshere();
    
  }

  //events functions
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

//meet mentor functions

  getMentor(role){
    this.userService.getMentors(role)
    .subscribe(res=>(this.mentors=res));
    // console.log(role)
  }
  sendRequest(mentor_ID){
    this.userService.sendMentorRequest(this.authenticated_user.uid, mentor_ID)
    .then(res => {
      this.toastr.success("Your request has been sent !!!","Notification");
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
    console.log(mentor_ID)
  }

}
