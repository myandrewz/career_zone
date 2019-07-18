import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import { AngularFirestore} from "angularfire2/firestore";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';
import {AuthService} from '../core/auth.service';


@Component({
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.scss']
})
export class AddmentorComponent implements OnInit {
  exampleForm: FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private db: AngularFirestore,
    private fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.createForm();
  }
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
      id: [''],
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
      id: [''],
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
  
}
