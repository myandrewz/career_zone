import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  displayprofileForm: FormGroup;
  authenticated_user: any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location : Location,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];

      //console.log(data)
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }

      var _authuser  = localStorage.getItem('authenticated_user')
      if(_authuser){
        this.authenticated_user = JSON.parse(_authuser);
        console.log(this.authenticated_user.uid)
      }
    })


  }

  createForm(name) {
    this.displayprofileForm = this.fb.group({
      
      image: [name, Validators.required ],
      name: [name, Validators.required ],
     // email: [name, Validators.required ],
      //dob: [name, Validators.required ],
      //sex: [name, Validators.required ],
      //role: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      this.router.navigate(['/new-profile']);
    }, err => console.log(err))
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
