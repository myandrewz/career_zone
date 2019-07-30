import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../blog.service';
import {Blog} from '../blog';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.scss']
})
export class ManageBlogsComponent implements OnInit {
  blogForm :  FormGroup;
  blogs$: Observable<Blog[]>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    
    ) { }

  ngOnInit(){   this.blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
    });
    this.blogs$ = this.blogService.getCollection$(ref => ref.orderBy('likes', 'desc'));
  
  }

  
   
  

  remove(id: string) {
    this.blogService.remove(id);
  }


  save() {
    const title = this.blogForm.get('title').value;
    const content = this.blogForm.get('content').value;
   
    this.blogService.add({ title, content, likes: 0 });
    this.blogForm.reset();
    /* TODO: save data to firestore */
  }

}
