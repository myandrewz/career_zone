import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {SuiModule} from 'ng2-semantic-ui';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentUserComponent } from './dashboard/students/student-user/student-user.component';
import { MentorComponent } from './dashboard/mentor/mentor.component';
import { CareerJobsComponent } from './career-jobs/career-jobs.component';
import { BlogsComponent } from './dashboard/blogs/blogs.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CareerEventsComponent } from './career-events/career-events.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogsUserComponent } from './blogs-user/blogs-user.component';
import { MeetMentorComponent } from './meet-mentor/meet-mentor.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
//import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { InternshipComponent } from './internship/internship.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddmentorComponent } from './dashboard/addmentor/addmentor.component';
import { EventsComponent } from './dashboard/events/events.component';
import { AddEventComponent } from './dashboard/events/add-event/add-event.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { PartnersComponent } from './dashboard/partners/partners.component';
import { AddPartnerComponent } from './dashboard/partners/add-partner/add-partner.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { NotificationComponent } from './components/dashboard/notification/notification.component';
import { 
  // MatButtonModule,
  //  MatCardModule, 
  //  MatProgressBarModule, 
  //  MatMenuModule, 
  //  MatToolbarModule, 
   MatDatepickerModule,
   MatTabsModule,
   MatInputModule,
   MatNativeDateModule,
   MatCheckboxModule,
   MatExpansionModule,
   MatRadioModule,
  //  MatIconModule, 
  //  MatSidenavModule, 
  //  MatListModule 
  } from '@angular/material';

import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { HelpComponent } from './components/dashboard/help/help.component';
import { MentorsRequestComponent } from './components/dashboard/mentors-request/mentors-request.component';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';

import { TimelineComponent } from './timeline/timeline.component';
import { DropZoneDirective } from './timeline/drop-zone.directive';
import { FileSizePipe } from './timeline/file-size.pipe';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { ViewRequestComponent } from './components/dashboard/view-request/view-request.component';
// import { MglTimelineModule } from 'angular-mgl-timeline';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageService } from './images/image.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    DashboardComponent,
    StudentUserComponent,
    MentorComponent,
    CareerJobsComponent,
    BlogsComponent,
    ReportsComponent,
    OverviewComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    CareerEventsComponent,
    BlogsUserComponent,
    MeetMentorComponent,
    TermsAndConditionsComponent,
    InternshipComponent,
    AdduserComponent,
    AddmentorComponent,
    EventsComponent,
    AddEventComponent,
    AuditTrailComponent,
    PartnersComponent,
    AddPartnerComponent,
    SkillsComponent,
    CategoriesComponent,
    NotificationComponent,
    ProfileComponent,
    EditProfileComponent,
    HelpComponent,
    MentorsRequestComponent,
    TimelineComponent,
    DropZoneDirective,
    FileSizePipe,
    RequestsComponent,
    ViewRequestComponent,
    ImageComponent,
    ImageListComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule,
    // MglTimelineModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCheckboxModule, 
    MatRadioModule,
    

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCi3hSfPY4V_5h4XIBuAv13P7AQlwvIG6A'
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule, // imports firebase/auth, only needed for auth features
    SuiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
    }),



  ],

  providers: [AuthService, UserService, UserResolver,


    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

