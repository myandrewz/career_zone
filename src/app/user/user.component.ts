import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss'],
})
export class UserComponent implements OnInit{

  isLinear = true;
  profileForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  authenticated_user: any;

  urls = new Array<string>();
  image:any;
  enableStudent = true;
  enableMentor = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private location : Location,
    private router: Router,
    public userService:UserService,
    private toastr: ToastrService
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
      this.firstFormGroup = this.fb.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this.fb.group({
        secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this.fb.group({
        thirdCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this.fb.group({
        forthCtrl: ['', Validators.required]
      });
      */
  }

  createForm() {
    this.profileForm = this.fb.group({
      //general
      role: [name, Validators.required ],
      full_name: [name, Validators.required],
      email: [name, Validators.required],
      dob: [name, Validators.required],
      gender: [name, Validators.required],
      is_approved: ['false', Validators.required],

      //student
      university: [name, Validators.required],
      campus: [name, Validators.required],
      course: [name, Validators.required],
      date_joined: [name, Validators.required],
      interests: [name, Validators.required],

      //mentor
      current_employer: [name, Validators.required],
      profession: [name, Validators.required],
      experience: [name, Validators.required],
      skills: [name, Validators.required],

      //userprofile
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

  skipStepper() {
    if(this.profileForm.value.role == "Student"){
      this.enableStudent=true;
      this.enableMentor=false;
    }
    if(this.profileForm.value.role == "Mentor"){
      this.enableStudent=false;
      this.enableMentor=true;
    }
      
  }

  registerProfile(){

    console.log(this.profileForm.value);
    
    this.userService.createUser(this.profileForm.value, this.authenticated_user.uid)
    .then(res => {
      
      this.toastr.success("Profile registration Successfull !!!","Notification");
      //console.log(res);
      this.router.navigate(['/dashboard']);
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
    
  }


}