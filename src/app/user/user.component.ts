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
  styleUrls: ['user.scss'],
})
export class UserComponent implements OnInit{

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  authenticated_user: any;

constructor (
  private fb: FormBuilder
  ) {
  this.createForm();
}


  ngOnInit() {
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
    /*this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  createForm(name) {
    this.firstFormGroup = this.fb.group({
      
      //image: [name, Validators.required ],
      //name: [name, Validators.required ],
     // email: [name, Validators.required ],
      //dob: [name, Validators.required ],
      //sex: [name, Validators.required ],
      role: [name, Validators.required ]
    });
  }

  //save(value){
    //this.userService.updateCurrentUser(value)
    //.then(res => {
     // this.router.navigate(['/new-profile']);
    //}, err => console.log(err))
 // }

  //logout(){
    //this.authService.doLogout()
    //.then((res) => {
     // this.location.back();
    //}, (error) => {
    //  console.log("Logout error", error);
    //});
  //}
//}
