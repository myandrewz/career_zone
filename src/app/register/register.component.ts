import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
        this.toastr.success("Registration Successful !!!","Notification");
        this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
     this.isLoading = true;
     this.authService.doRegister(value)
     .then(res => {
      this.isLoading = false;
      this.toastr.success("Registration Successful !!!","Notification");
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
      //this.errorMessage = "";
      //this.successMessage = "Your account has been created";
     }, err => {
       this.isLoading = false;
       this.toastr.error(err.message, "Error", {enableHtml :  true });
       console.log(err);
      // this.errorMessage = err.message;
      // this.successMessage = "";
     })
   }

   

}
