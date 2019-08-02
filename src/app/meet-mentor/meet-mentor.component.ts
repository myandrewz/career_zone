import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meet-mentor',
  templateUrl: './meet-mentor.component.html',
  styleUrls: ['./meet-mentor.component.scss']
})
export class MeetMentorComponent implements OnInit {
  mentors:any;
  authenticated_user:any;

  constructor(
    public userService:UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
    this.getMentor("mentor");
      
  }
  getMentor(role){
    this.userService.getMentor(role)
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
