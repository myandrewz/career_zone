import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Blog } from '../blog';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.scss']
})
export class ViewBlogsComponent implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogs$ = this.blogService.getCollection$();
  }

  like(blog: Blog) {
    this.blogService.update(blog.id, {likes: blog.likes + 1});
  }


}
