import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletterForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.createForm(); 
    }

  ngOnInit() {
  }
  createForm() {
    this.newsletterForm = this.fb.group({
      name: ['Muwonge Emmanuel',Validators.required],
      email: ['me@me.org',[Validators.required, Validators.email]]
    });
  }
  subscribeToNewsletter(){

    this.isLoading = true;
    this.toastr.success("Thanks For subscribing to our Newsletter","Notification");
    //this.isLoading = false;
    this.router.navigate(['/terms-and-conditions']);
    console.log(this.newsletterForm.value);
  }

}
