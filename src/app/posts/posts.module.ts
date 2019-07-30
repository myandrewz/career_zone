//Service to connect to database
import { NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/posts/posts.service';


const routes: Routes = []
  

@NgModule({

  declarations:
   [],

  imports: 
  [ RouterModule.forChild(routes),
    CommonModule
  ],

  providers :[PostService]
})
export class PostsModule { }
