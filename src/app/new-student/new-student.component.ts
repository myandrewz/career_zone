import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  studentProfileForm: FormGroup;
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
    this.studentProfileForm = this.fb.group({
      course: ['', Validators.required ],
      interest: ['',Validators.required],
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
  newstudentprofile(){

    this.isLoading = true;
    console.log(this.studentProfileForm.value);
    this.userService.createStudent(this.studentProfileForm.value, this.authenticated_user.uid)
    .then(
      res => {
          this.isLoading = false;
          this.router.navigate(['/new-student']);
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
