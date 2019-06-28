import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  isForgotPassword: boolean;
  emailInput: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['me@me.org', Validators.required ],
      password: ['Password1',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage("success", "Please Check Your Email");
      }, err => {
        this.showMessage("danger", err.message);
      });
  }
  showMessage(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }


  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(){

    this.isLoading = true;
    //console.log(this.loginForm.value);
    this.authService.doLogin(this.loginForm.value)
    .then(res => {
      this.isLoading = false;

      //console.log(res);

      localStorage.setItem('authenticated_user', JSON.stringify(res.user));
      this.router.navigate(['/user']);
    }, err => {
      this.isLoading = false
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
