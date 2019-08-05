import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../../core/auth.service';
import { Router, Params, ActivatedRoute } from '@angular/router'
import { UserService } from '../../../core/user.service';
import { RequestsService } from '../../../services/requests/requests.service';

export interface IContext {
  data:string;
}

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {

  @ViewChild('modalTemplate')
  public modalTemplate:ModalTemplate<IContext, string, string>

  cancelRequestForm: FormGroup;
  authenticated_user: any;
  user_profile: any;
  request_user_ID;
  request_doc_ID;
  request_user;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    public userService:UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public requestsService: RequestsService,
    public modalService:SuiModalService,
  ) { }

  ngOnInit() {
    var _userprofile  = localStorage.getItem('user_profile')
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser && _userprofile){
      this.authenticated_user = JSON.parse(_authuser);
      this.user_profile = JSON.parse(_userprofile);
      // console.log(this.authenticated_user.uid)
      // console.log(this.user_profile.role)
    }
    this.route.queryParams.subscribe(queryParams => {
      this.request_user_ID = queryParams['user_ID']
      this.request_doc_ID = queryParams['doc_ID']
      console.log(this.request_user_ID)
      console.log(this.request_doc_ID)
    })
    this.getUserprofile();
    this.cancelRequestForm = this.fb.group({
      reason: ['', [Validators.required]]
    })
  }

  getUserprofile(){
    this.userService.getUserProfile(this.request_user_ID).subscribe(res=>(this.request_user = res));

  }

  acceptMentorshipRequest(){
    this.requestsService.acceptMentorshipRequest(this.request_doc_ID);
    this.toastr.info("Request accepted !!!","Notification");
    this.router.navigate(['/profile/requests']);
  }

  denyMentorshipRequest(){
    this.requestsService.denyMentorshipRequest(this.request_doc_ID,this.cancelRequestForm.value);
  }

  openCancelRequestModal(dynamicContent:string = "Example") {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = { data: dynamicContent };
    config.size = 'tiny'
    config.mustScroll = true;

    this.modalService
        .open(config)
        .onApprove(result => {
          /* approve callback */ 
          this.denyMentorshipRequest()
          this.toastr.error("Request denied or cancelled !!!","Notification");
          this.router.navigate(['/profile/requests']);
        })
        .onDeny(result => { /* deny callback */});
  }


}
