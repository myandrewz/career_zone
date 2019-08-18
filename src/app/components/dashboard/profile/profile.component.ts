import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  authenticated_user: any;
  user_profile: any;

  constructor(
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    var _userprofile  = localStorage.getItem('user_profile')
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser && _userprofile){
      this.authenticated_user = JSON.parse(_authuser);
      this.user_profile = JSON.parse(_userprofile);
      console.log(this.authenticated_user.uid)
      console.log(this.user_profile.role)
    }
  }

signOut(){
  this.authService.doLogout()
  .then(res => {
    this.toastr.success("log out successful !!!","Notification");
  }, err => {
    this.toastr.error(err.message, "Error", {enableHtml :  true });
  });
  
}




}
