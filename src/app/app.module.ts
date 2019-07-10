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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import {SuiModule} from 'ng2-semantic-ui';
import { NewStudentComponent } from './new-student/new-student.component'; 
import { NewMentorComponent } from './new-mentor/new-mentor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentUserComponent } from './student-user/student-user.component';
import { MentorComponent } from './mentor/mentor.component';
import { CareerJobsComponent } from './career-jobs/career-jobs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ImagesVideosComponent } from './images-videos/images-videos.component';
import { ReportsComponent } from './reports/reports.component';
import { OverviewComponent } from './overview/overview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './material'
import { ToastrModule } from 'ngx-toastr';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { HashLocationStrategy } from "@angular/common";
import { Location } from "@angular/common";
import { LocationStrategy } from "@angular/common";
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CareerEventsComponent } from './career-events/career-events.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogsUserComponent } from './blogs-user/blogs-user.component';
import { MeetMentorComponent } from './meet-mentor/meet-mentor.component';
//import { DialogComponent } from './dialog/dialog.component';


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
    OverviewComponent,
    DialogComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CareerEventsComponent,
    ContactUsComponent,
    BlogsUserComponent,
    MeetMentorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  
   
    
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    SuiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      //positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
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

