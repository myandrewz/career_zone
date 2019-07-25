import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  addSkillForm: FormGroup;
  authenticated_user: any;

  skills;

  constructor(
    private fb: FormBuilder,
    public userService:UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getSkills();
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
  }

  createForm() {
    this.addSkillForm = this.fb.group({

      skill: [name, Validators.required ],
    })
  }

  getSkills(){
    this.userService.getSkills()
    .subscribe(res =>(this.skills = res));
  }

  addSkill(){
    // console.log(this.addSkillForm.value)

    this.userService.createSkill(this.addSkillForm.value, this.authenticated_user.uid)
    .then(res => {
      this.toastr.success("Skill added Successfull !!!","Notification");
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
  }
  deleteSkill(doc_ID){
    this.userService.deleteSkill(doc_ID)
    .then(res => {
      this.toastr.success("Skill Successfully Deleted !!!","Notification");
      //console.log(res);
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
  }

}
