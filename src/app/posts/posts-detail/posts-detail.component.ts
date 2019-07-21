import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
//import {FirebaseService} from '../firebase.service';
import { Post } from '../post';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {
  //post: Post;

  editing : boolean = false
 

  ngOnInit() {
    this.getPost()
    console.log(this)
  }

  image: string = null;
  content: any;
  title: any;
  post_data:any;
  post:any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private postService : PostService,
   // public firebaseService: FirebaseService,
    private db: AngularFirestore
  ) { }

  
  getPost(){
      this.post_data = this.db.collection('posts').snapshotChanges().pipe(map(changes => {
     
    return changes.map(a => {
    const data: any = a.payload.doc.data();
    data.id = a.payload.doc.id;
    return data;
     });
     })
     );
     
    this.post_data.subscribe(
     res => {
    console.log(res);
    this.post = res;
    // this.post_snapshot = res;
     }
    );
  }

  updatePost(){
    const formData = {
      title: this.post.title,
      content : this.post.content
    }
    const id = this.route.snapshot.paramMap.get("id")
    this.postService.update(id, formData)
    this.editing = false;


  };
 

  delete(){
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id)
    this.router.navigate(["/blog"])
  }


  // getBlogs() {
  //   this.blog_data = this.db.collection('posts').snapshotChanges().pipe(map(changes => {
     
  //   return changes.map(a => {
  //   const data: any = a.payload.doc.data();
  //   data.id = a.payload.doc.id;
  //   return data;
  //    });
  //    })
  //    );
     
  //   this.blog_data.subscribe(
  //    res => {
  //   console.log(res);
  //   this.blogs = res;
  //   // this.blogs_snapshot = res;
  //    }
  //   );
  // }

}
