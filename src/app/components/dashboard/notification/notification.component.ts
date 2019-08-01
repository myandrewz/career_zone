import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { AuthService } from '../../../core/auth.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  
  authenticated_user: any;
  user_profile: any;
  notifications;

  constructor(
    public notificationsService: NotificationsService,
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
    this.getNotifications();
  }
  getNotifications(){
    this.notificationsService.getUserNotifications(this.authenticated_user.uid, this.user_profile.role+"_ID")
    .subscribe(res => (this.notifications = res));

  }


}
