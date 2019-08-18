import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../../services/partners/partners.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {


  addPartnerForm: FormGroup;
  authenticated_user: any;

  urls = new Array<string>();
  display_image:any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: any;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  file: any;

  constructor(

    private fb: FormBuilder,
    private router: Router,
    public partnersService:PartnersService,
    private toastr: ToastrService,
    private afStorage: AngularFireStorage
  ) {
    this.createForm()
   }

  ngOnInit() {
    var _authuser  = localStorage.getItem('authenticated_user')
    if(_authuser){
      this.authenticated_user = JSON.parse(_authuser);
      console.log(this.authenticated_user.uid)
    }
  }

  createForm() {
    this.addPartnerForm = this.fb.group({
      name: [name, Validators.required ],
      link: [name, Validators.required ],
      image: [name, Validators.required]
    })
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      this.display_image=true;
      this.file = event.target.files[0];
    }
  }

  addPartner(){

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.file);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    // this.uploadProgress = this.task.percentageChanges();


    this.task.snapshotChanges().pipe(
      finalize(() => {
       this.ref.getDownloadURL().subscribe(url => {
         console.log(url); // <-- do what ever you want with the url..
         this.downloadURL = url;
        //  console.log(this.downloadURL);
       });
     }))
    .subscribe();

    this.partnersService.createPartner(this.addPartnerForm.value, this.downloadURL, this.authenticated_user.uid)
    .then(res => {

      this.toastr.success("Partner Successfully Added !!!","Notification");
      //console.log(res);
      this.router.navigate(['/dashboard/partners']);
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });

  }


}
