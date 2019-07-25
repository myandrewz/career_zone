import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts : Observable<Post[]>
  constructor(private postService: PostService, public auth: AuthService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts()
    console.log(this)  
  }


  delete(id: string){
    this.postService.delete(id )
  }

}
