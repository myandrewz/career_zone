import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-new-mentor',
  templateUrl: './new-mentor.component.html',
  styleUrls: ['./new-mentor.component.scss']
})
export class NewMentorComponent implements OnInit {
  mentorProfileForm: FormGroup;
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
    this.mentorProfileForm = this.fb.group({
      employer: ['', Validators.required ],
      profession: ['',Validators.required],
      skills: ['',Validators.required],
      email: ['',Validators.required]
    });
  }

  ngOnInit() {
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
  }
  newmentorprofile(){

    this.isLoading = true;
    console.log(this.mentorProfileForm.value);
    this.userService.createMentor(this.mentorProfileForm.value, this.authenticated_user.uid)
    .then(
      res => {
          this.isLoading = false;
          this.router.navigate(['/new-mentor']);
      }, (error) =>{
        this.router.navigate(['/new-student']);
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
