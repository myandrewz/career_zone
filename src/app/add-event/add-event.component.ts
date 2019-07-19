import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  
  addEventForm: FormGroup;;
  authenticated_user: any;

  urls = new Array<string>();
  display_image:any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  images: any;

  constructor(
    
    private fb: FormBuilder,
    private router: Router,
    public eventsService:EventsService,
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
    this.addEventForm = this.fb.group({
      //general
      title: [name, Validators.required ],
      date: [name, Validators.required ],
      location: [name, Validators.required ],
      category: [name, Validators.required ],
      description: [name, Validators.required ],
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
      const id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(id);
      this.task = this.ref.put(event.target.files[0]);
      this.task.snapshotChanges().pipe(
        finalize(() => {
         this.ref.getDownloadURL().subscribe(url => {
           console.log(url); // <-- do what ever you want with the url..
         });
       }))
       .subscribe();
      //console.log(this.downloadURL);
    }
  }

  addEvent(){

    console.log(this.addEventForm.value);
    
    this.eventsService.createEvent(this.addEventForm.value, this.authenticated_user.uid)
    .then(res => {
      
      this.toastr.success("Event Successfully Added !!!","Notification");
      //console.log(res);
      this.router.navigate(['/dashboard/events']);
    }, err => {
      this.toastr.error(err.message, "Error", {enableHtml :  true });
    });
    
  }

}
