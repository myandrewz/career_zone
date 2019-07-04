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
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  authenticated_user: any;

  urls = new Array<string>();
  image:any;

  constructor(
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
    /*
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    */
  }

  createForm() {
    this.firstFormGroup = this.fb.group({
      role: [name, Validators.required ],

      //student
      firstname: [name, Validators.required],
      lastname: [name, Validators.required],
      email: [name, Validators.required],
      gender: [name, Validators.required],
      university: [name, Validators.required],
      course: [name, Validators.required],
      yearOfJoining: [name, Validators.required],
      interests: [name, Validators.required],

      //mentor
      dob: [name, Validators.required],
      location: [name, Validators.required],
      company: [name, Validators.required],
      title: [name, Validators.required],
      duration: [name, Validators.required],
      skills: [name, Validators.required],

      //userprofile,
      image: [name, Validators.required],
      username: [name, Validators.required]
    })
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      this.image=true;
    }
  }


}

  //createForm(name) {
    //this.displayprofileForm = this.fb.group({
      
      //image: [name, Validators.required ],
      //name: [name, Validators.required ],
     // email: [name, Validators.required ],
      //dob: [name, Validators.required ],
      //sex: [name, Validators.required ],
      //role: [name, Validators.required ]
    //});
  //}

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
