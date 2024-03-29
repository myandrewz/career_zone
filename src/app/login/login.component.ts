import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { delay } from 'rxjs/internal/operators';

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
  styleUrls: ['login.scss'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]
})

export class LoginComponent implements OnInit{

  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>

  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  isForgotPassword: boolean;
  emailInput: string;
  resetPasswordForm: FormGroup;
  user: any;
  view: string;
  is_resetting_password= false;
  role:any; 
  profile;
  // profile: Array<any>;

  

  constructor(
    public authService: AuthService,
    public userService:UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public modalService:SuiModalService,
    @Inject(DOCUMENT) document
    ) 
  {
    this.createForm();
    this.errorMessage = null;
		this.user = null;
		this.view = "loading";

  }


  public authenticate( email: string ) : void {






  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], this.checkValidEmail]
    }) }



  
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
      this.router.navigate(['/dashboard']);
    })
  }

  tryLogin(){
//alert('haha')
    this.isLoading = true;
    ///console.log(this.loginForm.value);
    this.authService.doLogin(this.loginForm.value)
    .then(res => {
      
      this.isLoading = false;
      this.toastr.success("Login Successful !!!","Notification");

      this.userService.getUserProfile(res.user.uid)
      .subscribe(resProfile => {
        resProfile.forEach(profileSet => {
          this.profile = profileSet.payload.doc.data();
          this.role = this.profile.role;
          console.log(this.profile);
          console.log(res);
      
          localStorage.setItem('user_profile', JSON.stringify(this.profile));
          localStorage.setItem('authenticated_user', JSON.stringify(res.user));
          this.router.navigate(['/dashboard/Overview']);
        });
      });
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
        
          
        })
        .onDeny(result => { /* deny callback */});
  }

resetPassword(){
  this.is_resetting_password = true
          console.log(this.resetPasswordForm.value)
          this.authService.sendPasswordResetEmail(this.resetPasswordForm.value.email).then(
            
            res =>{
              console.log(res)
              this. successMessage = 'Done';
            },
            err=>{
              console.log(err)
              this.errorMessage = ''
            }
          ) 
          this.toastr.info("Check your email Inbox !!!","Info");
          
}
}


