import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import "firebase/auth";



export interface IContext {
  data:string;
}

interface User {
	id: string;
	email: string;
}

type View = "loading" | "login" | "sent" | "authenticate" | "home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>

  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  isForgotPassword: boolean;
  emailInput: string;
  form: FormGroup;
  user: any;
  view: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public modalService:SuiModalService
  ) {
    this.createForm();
    this.errorMessage = null;
		this.user = null;
		this.view = "loading";

  }


  public authenticate( email: string ) : void {






  }

  
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], this.checkValidEmail]
    })
      
  }



  
  createForm() {
    this.loginForm = this.fb.group({
      email: ['me@me.org', Validators.required ],
      password: ['Password1',Validators.required]
    });
  }

  checkValidEmail(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'super@secret.com') {
            resolve({ emailIsTaken: true })
        } else {resolve(null)}
      }, 2000)
    })

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
      this.toastr.success("Login Successful !!!","Notification");
      this.router.navigate(['/user']);
    })
  }

  tryLogin(){

    this.isLoading = true;
    //console.log(this.loginForm.value);
    this.authService.doLogin(this.loginForm.value)
    .then(res => {
      this.isLoading = false;
      this.toastr.success("Login Successful !!!","Notification");
      //console.log(res);
      localStorage.setItem('authenticated_user', JSON.stringify(res.user));
      this.router.navigate(['/user']);
    }, err => {
      this.isLoading = false
      this.toastr.error(err.message, "Error", {enableHtml :  true });
      //console.log(err);
      //this.errorMessage = err.message;
    });
  }

  openForgotPasswordModal(dynamicContent:string = "Example") {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = { data: dynamicContent };
    config.size = 'tiny'
    config.mustScroll = true;

    this.modalService
        .open(config)
        .onApprove(result => { /* approve callback */ 
          this.authService.sendPasswordResetEmail(this.emailInput);  
          this.toastr.info("Check your email Inbox !!!","Info");
          
        })
        .onDeny(result => { /* deny callback */});
}
}
