import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  addCategoryForm: FormGroup;
  authenticated_user: any;

  categories;

  constructor(
    private fb: FormBuilder,
    public eventsService:EventsService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getCategories();
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
  }

  createForm() {
    this.addCategoryForm = this.fb.group({

      category: [name, Validators.required ],
    })
  }

  getCategories(){
    this.eventsService.getCategories()
    .subscribe(res =>(this.categories = res));
  }

  addCategory(){
    // console.log(this.addCategoryForm.value)

    this.eventsService.createCategory(this.addCategoryForm.value, this.authenticated_user.uid)
    .then(res => {
      this.toastr.success("Skill added Successfull !!!","Notification");
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
  }
  deleteCategory(doc_ID){
    this.eventsService.deleteCategory(doc_ID)
    .then(res => {
      this.toastr.success("Skill Successfully Deleted !!!","Notification");
      //console.log(res);
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
  }

}
