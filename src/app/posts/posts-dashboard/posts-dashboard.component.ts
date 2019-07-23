import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import {Router,Params} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';


@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss'],
 
})
export class PostsDashboardComponent implements OnInit {




ngOnInit() {
  this.getBlogs()
  
  }


  

  image: string = null;
  content: any;
  title: any;
  blog_data:any;
  blogs:any;
  doc_ID: any;

  buttonText : string = "Create Post";
  uploadPercent : Observable<number>
  downloadURL : Observable<string>

  constructor(
    private auth: AuthService, 
    public db:AngularFirestore,
     private postService: PostService, 
      private storage: AngularFireStorage ,
      private router : Router) { }



  createPost(){
    const data = {
      author : this.auth.authState.displayName || this.auth.authState.email,
      authorId : this.auth.currentUserId,
      content : this.content,
      image : this.image,
      published : new Date(),
      title : this.title
    };

    this.postService.create(data)
    this.title = ''
    this.content = ''
    this.buttonText = 'Blog Created!'
    setTimeout(( )=> (this.buttonText = "Create Post"), 3000);
  }
   
  uploadImage(event) {
    const file = event.target.files[0]
    const path = 'posts/${file.name}'
    //console.log(event.target.files)
    if (file.type.split('/') [0] !=='image'){
      return alert ('only image files')
    } else{
     const task = this.storage.upload(path,file)
    //  this.downloadURL = task.getdownloadURL()
     this.uploadPercent = task.percentageChanges()
     console.log('Image Uploaded  ')
     this.downloadURL.subscribe(url => this.image = this.image = url)

    }

  }

  getThisBlog(doc_ID){
    console.log(doc_ID);

    localStorage.setItem('doc_ID', doc_ID);
    this.router.navigate(['/posts-detail'])



  }

  getBlogs() {
    this.blog_data = this.db.collection('posts').snapshotChanges().pipe(map(changes => {
     
    return changes.map(a => {
    const data: any = a.payload.doc.data();
    data.id = a.payload.doc.id;
    return data;
     });
     })
     );
     
    this.blog_data.subscribe(
     res => {
    console.log(res);
    this.blogs = res;
    // this.blogs_snapshot = res;
     }
    );
  }

  

}
