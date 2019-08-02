import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private toastr: ToastrService
  ) {
    
   }

  ngOnInit() {
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
