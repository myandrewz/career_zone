import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { RequestsService } from '../services/requests/requests.service';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { delayWhen } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import { delay } from 'q';

@Component({
  selector: 'app-meet-mentor',
  templateUrl: './meet-mentor.component.html',
  styleUrls: ['./meet-mentor.component.scss']
})
export class MeetMentorComponent implements OnInit {
  mentors:any;
  authenticated_user:any;
  user_profile:any;
  mentor;
  student;

  constructor(
    public userService:UserService,
    private requestsService: RequestsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    var _userprofile  = localStorage.getItem('user_profile')
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser && _userprofile){
      this.authenticated_user = JSON.parse(_authuser);
      this.user_profile = JSON.parse(_userprofile);
      console.log(this.authenticated_user.uid)
      console.log(this.user_profile.role)
    }
    this.getMentor("mentor");
      
  }
  getMentor(role){
    this.userService.getMentors(role)
    .subscribe(res=>(this.mentors=res));
    // console.log(role)
  }
  sendRequest(mentor_ID){
    this.userService.getUserProfile(mentor_ID).subscribe(res=>(this.mentor=res));
    this.userService.getUserProfile(this.authenticated_user.uid).subscribe(res=>(this.student=res));
    // this.requestsService
    // .sendMentorRequest(this.authenticated_user.uid, this.mentor, mentor_ID, this.student)
    // .then(res => {
    //   this.toastr.success("Your request has been sent !!!","Notification");
    // }, err => {
    //   this.toastr.error(err.message, "Error", {enableHtml :  true });
    // });
    (async () => { 
      // Do something before delay
      console.log('before delay')
  
      await delay(10000);
  
      // Do something after
      console.log('after delay')
      console.log(mentor_ID)
      console.log(this.mentor)
      console.log(this.student)
      console.log(this.authenticated_user.uid)
    })();
  }


}
