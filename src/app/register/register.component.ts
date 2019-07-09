import { Component, ViewChild, OnInit, HostListener, Inject } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(200)]),
      transition(':leave',[ animate(400)]),
    ]
)]
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;
  sendEmail: string = '';


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(DOCUMENT) document
  ) {
    this.createForm();
   }

   ngOnInit() {  }

   @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 50) {
       let element = document.getElementById('navbar');
       element.classList.add('sticky');
     } else {
      let element = document.getElementById('navbar');
        element.classList.remove('sticky'); 
     }
  }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['me@me.org', Validators.required ],
       password: ['Password1',Validators.required]
     });
   }

   tryFacebookLogin(){
     this.authService.doFacebookLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryTwitterLogin(){
     this.authService.doTwitterLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
        this.toastr.success("Registration Successful !!!","Notification");
        this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
   // alert('i get here')

    
     this.isLoading = true;
     this.authService.doRegister(value).then(res => {

      this.toastr.success("Registration Successful !!!","Notification");
      localStorage.setItem('authenticated_user', JSON.stringify(res.user));
      this.router.navigate(['/user']);
      console.log(res);
      //this.errorMessage = "";
      //this.successMessage = "Your account has been created";


      if (res.user){
        const parameters = {
          'reply_to': 'res.user.email',
          'from_name':' Career Zone',
          'from_email':'noreply@careerzone.nsssfug.org',
          'to_name': 'New User',
          'to_email':res.user.email,
          'subject':'welcome to career zone'
        }

        console.log(parameters)

        this.sendWelcomeEmail(parameters);
        this.isLoading = false;
         
       this.router.navigate(['/user']);
      
        

      }
      else {
        this.errorMessage = "";
      }
     }, err => {

      console.log(err);
       this.isLoading = false;
       this.toastr.error(err.message, "Info", {enableHtml :  true });
       
    
     })
   }


  sendWelcomeEmail(parameters) {
    
        emailjs.send('gmail','template_k4ep89Si', parameters,  'user_4gGTxYufsWsj6crQu2fdt')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
          console.log('FAILED...', err);
        });
  }

   

}
