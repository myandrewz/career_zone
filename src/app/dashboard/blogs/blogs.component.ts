import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';
import { AuditTrailService } from 'src/app/services/audit-trail/audit-trail.service';
import { PostService} from 'src/app/services/posts/posts.service';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  ngOnInit() {
    this.getBlogs()
  }

  image: string = null;
  content: any;
  title: any;
  blog_data:any;
  blogs:any

  buttonText : string = "Create Post";
  uploadPercent : Observable<number>
  downloadURL : Observable<string>

  constructor(
    private auth: AuthService, 
    public db:AngularFirestore, 
    private postService: PostService, 
    private storage: AngularFireStorage,
    public _auditTrailService:AuditTrailService) { }

    createPost(){
      const data = {
        author : this.auth.authState.displayName || this.auth.authState.email,
        authorId : this.auth.currentUserId,
        content : this.content,
        image : this.image,
        published : new Date(),
        title : this.title
      };
  
      this.postService.create(data).then(
        res =>{
          console.log(res)
  
          //report audit trail
          const _audit_trail = {
            'action' : ' has created a new blog post ',
            'object': res.id,
            'created_at': new Date(),
            'user':{
              'id': '4545454545454545454',
              'email':'daanyu@gmail.com' }
             } 
          console.log(_audit_trail)
  
          this._auditTrailService.createAuditTrailLog(_audit_trail)
          //this._createAuditTrailLog();
        //audit trail
        },
  
        err=>{
          console.log(err)
        }
      )
  
  
      this.title = ''
      this.content = ''
      this.buttonText = 'Post Created!'
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
