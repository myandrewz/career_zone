import { Component, ViewChild, OnInit, HostListener, Inject } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

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
