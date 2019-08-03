import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router, Params, ActivatedRoute } from '@angular/router'
import { UserService } from '../../../core/user.service';
import { RequestsService } from '../../../services/requests/requests.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
  
  authenticated_user: any;
  user_profile: any;
  request_user_ID;
  request_doc_ID;
  request_user;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    public userService:UserService,
    public requestsService: RequestsService,
  ) { }

  ngOnInit() {
    var _userprofile  = localStorage.getItem('user_profile')
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser && _userprofile){
      this.authenticated_user = JSON.parse(_authuser);
      this.user_profile = JSON.parse(_userprofile);
      // console.log(this.authenticated_user.uid)
      // console.log(this.user_profile.role)
    }
    this.route.queryParams.subscribe(queryParams => {
      this.request_user_ID = queryParams['user_ID']
      this.request_doc_ID = queryParams['doc_ID']
      console.log(this.request_user_ID)
      console.log(this.request_doc_ID)
    })
    this.getUserprofile();
  }

  getUserprofile(){
    this.userService.getUserProfile(this.request_user_ID).subscribe(res=>(this.request_user = res));

  }

  acceptMentorshipRequest(){
    this.requestsService.acceptMentorshipRequest(this.request_doc_ID);
  }


}
