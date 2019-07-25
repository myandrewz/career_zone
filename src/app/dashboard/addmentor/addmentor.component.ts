import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFirestore} from "angularfire2/firestore";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../core/user.service';
import {AuthService} from '../../core/auth.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Resolve, ActivatedRouteSnapshot} from "@angular/router";


@Component({
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.scss']
})
export class AddmentorComponent implements OnInit {

  //exampleForm: FormGroup;

  isLinear = true;
  profileForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  authenticated_user: any;

  urls = new Array<string>();
  image:any;
  enableStudent = false;
  enableMentor = true;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private db: AngularFirestore,
    private fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  ngOnInit() {
   // this.createForm();
   var _authuser  = localStorage.getItem('authenticated_user')
   if(_authuser){
     this.authenticated_user = JSON.parse(_authuser);
     console.log(this.authenticated_user.uid)
   }

  }

  createForm() {
    this.profileForm = this.fb.group({
      //general
      role: [name, Validators.required ],
      full_name: [name, Validators.required],
      email: [name, Validators.required],
      dob: [name, Validators.required],
      gender: [name, Validators.required],
      is_approved: ['true', Validators.required],

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
      this.router.navigate(['/dashboard/Overview']);
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });

  }


/*
  resetFields(){
    this.exampleForm = this.fb.group({
      full_name: [''],
      image: [''],
      current_employer: [''],
      experience: [''],
      profession: [''],
      dob: [''],
      role: ['Mentor'],
      created_at: [''],
      email: [''],
      gender: [''],
      skills: ['']
      });
    }

  createForm() {
    this.exampleForm = this.fb.group({
      full_name: [''],
      image: [''],
      current_employer: [''],
      experience: [''],
      profession: [''],
      dob: [''],
      role: ['Mentor'],
      created_at: [''],
      email: [''],
      gender: [''],
      skills: ['']
     });
    }

  onSubmit(value){
    this.userService.createUser(value, 23)
    .then(
       res => {
        //console.log(res);
         this.resetFields();
         this.router.navigate(['/mentor']);
       }
     )
   }
  */
}
