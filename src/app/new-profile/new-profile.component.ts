import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit {

  profileForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    public authService: AuthService,
    private location : Location,
    private router: Router,
    private fb: FormBuilder

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
  }
  newprofile(){

    this.isLoading = true;
    console.log(this.profileForm.value);
    this.authService.doLogin(this.profileForm.value)
    .then(res => {
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
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
