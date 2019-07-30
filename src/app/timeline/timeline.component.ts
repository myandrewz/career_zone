import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore} from "angularfire2/firestore";
import { Router, Params } from '@angular/router';
import { tap, finalize } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

@NgModule({
  imports: [ 
  NgbModule
  ]})

export class TimelineComponent implements OnInit{

  ref: AngularFireStorageReference;
  file: any;
  urls = new Array<string>();
  task: any;
  display_image:any;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  //uploadState: Observable<string>;
  //uploadProgress: Observable<number>;


  alternate: boolean = true;
  toggle: boolean = false;
  color: boolean = false;
  size: number = 40;
  expandEnabled: boolean = true;
  side = 'left';

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit(){}

  entries = [
    {
      header: 'header',
      content: 'content'
    },
    {
      header: 'header',
      content: 'content'
    }
  ]

  addEntry() {
    this.entries.push({
      header: 'header',
      content: 'content'
    })
  }

  removeEntry() {
    this.entries.pop();
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`)
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

//mgl timeline ends here



//upload drop zone starts here
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  uploadFile(_obj_file) {
  
    console.log(this.size);

    const file = _obj_file.target.files[0];

    console.log( file)
    
    const randomId = Math.random().toString(36).substring(2);

    this.ref = this.storage.ref("photos/"+randomId);

    this.task = this.ref.put(file).then(
    (res) => {

      console.log(res)
    this.ref.getDownloadURL().subscribe(
    snapshot => {
    //this.saveBlog(snapshot);

    console.log(snapshot)
    },
    err => {
    console.log(err);
    //this.is_busy = false;
    }
    );
    }
    );
    
   }

  // startUpload(event: FileList) {
  //   // The File object
  //   const file = event.item(0);

  //   console.log(file);

  //   const id = Math.random().toString(36).substring(2);
  //   this.ref = this.storage.ref(id);
  //   this.task = this.ref.put(this.file);

  //   // Client-side validation example
  //   if (file.type.split('/')[0] !== 'image') { 
  //     console.error('unsupported file type :( ')
  //     return;
  //   }



  //   // The file's download URL
  //   this.snapshot.pipe(
  //     finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe(url => {

  //   console.log(url);});
  //   //this.downloadURL = ref.getDownloadURL();

  //   this.snapshot = this.task.snapshotChanges().pipe(
  //   tap(snap => {
  //     console.log(snap)
  //     if (snap.bytesTransferred === snap.totalBytes) {

  //       // Update firestore on completion
  //      this.db.collection('test').add( { path, size: snap.totalBytes })
  //     }
  //   })
  //   )}

  // Determines if the upload task is active
 
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
