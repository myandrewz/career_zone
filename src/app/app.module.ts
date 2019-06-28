import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
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
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import {SuiModule} from 'ng2-semantic-ui';
<<<<<<< HEAD
import { NewStudentComponent } from './new-student/new-student.component';
import { NewMentorComponent } from './new-mentor/new-mentor.component';
=======
import { DashboardComponent } from './dashboard/dashboard.component';

import { StudentUserComponent } from './student-user/student-user.component';
import { MentorComponent } from './mentor/mentor.component';
import { CareerJobsComponent } from './career-jobs/career-jobs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ImagesVideosComponent } from './images-videos/images-videos.component';
import { ReportsComponent } from './reports/reports.component';
import { OverviewComponent } from './overview/overview.component';
>>>>>>> 708974dd613945b0b3b4cc9d56b42c30fb9df1db
//import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   
    UserComponent,
    RegisterComponent,
    NewProfileComponent,
<<<<<<< HEAD
    NewStudentComponent,
    NewMentorComponent

    
=======
    DashboardComponent,
    StudentUserComponent,
    MentorComponent,
    CareerJobsComponent,
    BlogsComponent,
    ImagesVideosComponent,
    ReportsComponent,
    OverviewComponent
>>>>>>> 708974dd613945b0b3b4cc9d56b42c30fb9df1db
  ],
  imports: [
    BrowserModule,
    
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    SuiModule,
   // FlexLayoutModule
  ],
  
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

