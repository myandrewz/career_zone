import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { AuthService } from '../../../core/auth.service';
import { Router, Params } from '@angular/router'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  
  authenticated_user: any;
  user_profile: any;
  requests;

  constructor(
    public requestsService: RequestsService,
    private router: Router,
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
    this.getRequests();
  }
  getRequests(){
    this.requestsService.getUserRequests(this.authenticated_user.uid, this.user_profile.role+"_ID")
    .subscribe(res => (this.requests = res));

  }


}
