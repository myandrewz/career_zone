import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required]
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
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
     this.isLoading = true;
     this.authService.doRegister(value)
     .then(res => {
      this.isLoading = false;
      localStorage.setItem('authenticated_user', JSON.stringify(res.user));

      if (res.user){
        

        res.user.sendWelcomeEmail(res.user.email, res.user.displayName).subscribe(
          res =>{
            console.log(res)
          },
          err =>{
            console.log(err)
          }
        )

      }
      else {
        this.errorMessage = "";
      }

    
      this.router.navigate(['/user']);
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
     // this.sendEmail = "Welcome to the Expo";

     }, err => {
       this.isLoading = false;
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

}
