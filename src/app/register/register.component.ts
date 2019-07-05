import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;
  sendEmail: string = '';


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['myandrewz@gmail.com', Validators.required ],
       password: ['password23',Validators.required]
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
    alert('i get here')

    
     this.isLoading = true;
     this.authService.doRegister(value).then(res => {

      this.toastr.success("Registration Successful !!!","Notification");
      localStorage.setItem('authenticated_user', JSON.stringify(res.user));


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

   
      //this.errorMessage = "";
      //this.successMessage = "Your account has been created";
     }, err => {

      console.log(err);
       this.isLoading = false;
       this.toastr.info(err.message, "Info", {enableHtml :  true });
       
    
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
