import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { NewMentorComponent } from './new-mentor/new-mentor.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentUserComponent } from './student-user/student-user.component';
import {MentorComponent} from './mentor/mentor.component';
import { CareerJobsComponent } from './career-jobs/career-jobs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ImagesVideosComponent } from './images-videos/images-videos.component';
import { OverviewComponent } from './overview/overview.component';
import { BlogsUserComponent } from './blogs-user/blogs-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { MeetMentorComponent } from './meet-mentor/meet-mentor.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { InternshipComponent } from './internship/internship.component';
import { CareerEventsComponent } from './career-events/career-events.component';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddmentorComponent } from './addmentor/addmentor.component';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent},
  { path: 'dashboard', component: DashboardComponent,
   children: [
    { path: 'Overview', component: OverviewComponent},
    { path: 'students', component: StudentUserComponent},
    { path: 'Mentors', component: MentorComponent},
    { path: 'careerjobs', component: CareerJobsComponent},
    { path: 'Blogs', component: BlogsComponent},
    { path: 'imagesvideos', component: ImagesVideosComponent},
  ]},
  
  { path: 'new-profile', component: NewProfileComponent, canActivate: [AuthGuard]},
  { path: 'new-student', component: NewStudentComponent},
  { path: 'new-mentor', component: NewMentorComponent},
  { path: 'blogs-user', component: BlogsUserComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  { path: 'meet-mentor', component: MeetMentorComponent},
  { path: 'newsletter', component: NewsletterComponent},
  { path: 'internship', component: InternshipComponent},
  { path: 'career-events', component: CareerEventsComponent},
  { path: 'adduser', component: AdduserComponent},
  { path: 'addmentor', component: AddmentorComponent},



];
