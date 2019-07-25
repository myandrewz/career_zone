import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore} from "angularfire2/firestore";
import { Router, Params } from '@angular/router';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit{

  ref: AngularFireStorageReference;
  file: any;
  urls = new Array<string>();
  task: AngularFireUploadTask;
  display_image:any;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: any;/*Observable<string>;*/
  isHovering: boolean;
  //uploadState: Observable<string>;
  //uploadProgress: Observable<number>;

  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit(){}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(this.file);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();


    this.task.snapshotChanges().pipe(
    // The file's download URL
    finalize(() => this.ref.getDownloadURL.subscribe(url => { 
      console.log(url); // <-- do what ever you want with the url..
      this.downloadURL = url;})),

    //tap(snap => {
      //console.log(snap)
      //if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
       // this.db.collection('photos').add( { path, size: snap.totalBytes })
     // }
   // })
    ).subscribe();

  }

  // Determines if the upload task is active
 
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
