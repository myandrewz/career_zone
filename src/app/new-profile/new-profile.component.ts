import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit {

  profileForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  authenticated_user: any;

  constructor(
    public authService: AuthService,
    private location : Location,
    private router: Router,
    private fb: FormBuilder,
    public userService:UserService

  ) { 
    this.createForm();
  }
  createForm() {
    this.profileForm = this.fb.group({
      dob: ['', Validators.required ],
      sex: ['',Validators.required],
      role: ['',Validators.required]
    });
  }

  ngOnInit() {
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
  }
  newprofile(){

    this.isLoading = true;
    console.log(this.profileForm.value);
    this.userService.createUser(this.profileForm.value, this.authenticated_user.uid)
    .then(
      res => {
        if(this.profileForm.value.role == "Student"){
          this.isLoading = false;
          this.router.navigate(['/new-student']);
        }
        else{
          this.isLoading = false;
          this.router.navigate(['/new-mentor']);
        }
      }
    )
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
