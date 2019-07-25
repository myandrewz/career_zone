import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
//import { request } from 'https';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletterForm: FormGroup;
  isLoading = false;
  newsletterData: any;
  email_address: any;
  status: any;
  merge_fields: any;
  postData:any;
  options:any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private sanitizer:DomSanitizer
    ) {
      this.createForm(); 
    }

  ngOnInit() {
  }
  createForm() {
    this.newsletterForm = this.fb.group({
      name: ['Muwonge Emmanuel',Validators.required],
      email: ['me@me.org',[Validators.required, Validators.email]]
    });
  }
  subscribeToNewsletter(){

    this.isLoading = true;
    this.toastr.success("Thanks For subscribing to our Newsletter","Notification");
    //this.isLoading = false;
    this.newsletterData = {
      members:[{
        "email_address":this.newsletterForm.value.email,
        "status":'subscribed',
        /*merge_fields:{
          FNAME:this.newsletterForm.value.name
        }*/
      }
        
      ]
    }
    this.postData = JSON.stringify(this.newsletterData);
    this.options = {
      url:'https://us3.api.mailchimp.com/3.0/lists/fc16a07e7e',
      method:'POST',
      headers: {
        Authorization:'auth 323d7265f1cdb9037e9613e7f3d4f14e-us3'
      },
      body:this.postData
    };
    let url = 'https://us3.api.mailchimp.com/3.0/lists/fc16a07e7e';
    this.http.post(url, this.postData).subscribe(res => console.log(res));
    this.router.navigate(['/terms-and-conditions']);
    console.log(this.postData);
  }

}
