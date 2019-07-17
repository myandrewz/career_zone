import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import {QuillModule} from 'ngx-quill';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component'; 
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard'; 
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import {SuiModule} from 'ng2-semantic-ui';
import { NewStudentComponent } from './new-student/new-student.component'; 
import { NewMentorComponent } from './new-mentor/new-mentor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentUserComponent } from './student-user/student-user.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MentorComponent } from './mentor/mentor.component';
import { CareerJobsComponent } from './career-jobs/career-jobs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ImagesVideosComponent } from './images-videos/images-videos.component';
import { ReportsComponent } from './reports/reports.component';
import { OverviewComponent } from './overview/overview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './material'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { HashLocationStrategy } from "@angular/common";
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { Location } from "@angular/common";
import { LocationStrategy } from "@angular/common";
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header.component';
import {WysiwygComponent} from './wysiwyg/wysiwyg.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
//import { DialogComponent } from './dialog/dialog.component';
const routes : Routes = [
  {path : '',redirectTo: '/blog', pathMatch: 'full' },
  {path : '',loadChildren: './posts/posts.modulePostModule' },
  {path : '',redirectTo: '/blog', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    NewProfileComponent,
    NewMentorComponent,
    NewStudentComponent,
    DashboardComponent,
    StudentUserComponent,
    MentorComponent,
    CareerJobsComponent,
    BlogsComponent,
    ImagesVideosComponent,
    ReportsComponent,
    OverviewComponent,WysiwygComponent,
    DialogComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    MaterialModule,
    RichTextEditorAllModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,AngularFireDatabaseModule, // imports firebase/auth, only needed for auth features
    SuiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      //positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SharedModule,
    PostsModule,
    QuillModule.forRoot()
   // FlexLayoutModule
  ],
  
  providers: [AuthService, UserService, UserResolver,
    
                      
       
    Location,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
},
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

