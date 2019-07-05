import { Component, ViewChild, OnInit, HostListener, Inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

export interface IContext {
  data:string;
}

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
  form: FormGroup;

  

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public modalService:SuiModalService,
    @Inject(DOCUMENT) document
    ) 
  {
    this.createForm();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], this.checkValidEmail]
    }) }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
       if (window.pageYOffset > 60) {
         let element = document.getElementById('navbar');
         element.classList.add('sticky');
       } else {
        let element = document.getElementById('navbar');
          element.classList.remove('sticky'); 
       }
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
          this.toastr.info("Check your email Inbox !!!","Info");
          
        })
        .onDeny(result => { /* deny callback */});
  }
}
