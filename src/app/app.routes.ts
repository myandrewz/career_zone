import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentUserComponent } from './dashboard/students/student-user/student-user.component';
import {MentorComponent} from './dashboard/mentor/mentor.component';
import { CareerJobsComponent } from './career-jobs/career-jobs.component';
import { BlogsComponent } from './dashboard/blogs/blogs.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { BlogsUserComponent } from './blogs-user/blogs-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { MeetMentorComponent } from './meet-mentor/meet-mentor.component';
import { InternshipComponent } from './internship/internship.component';
import { CareerEventsComponent } from './career-events/career-events.component';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddmentorComponent } from './dashboard/addmentor/addmentor.component';
import { EventsComponent } from './dashboard/events/events.component';
import { AddEventComponent } from './dashboard/events/add-event/add-event.component';
import { PartnersComponent } from './dashboard/partners/partners.component';
import { AddPartnerComponent } from './dashboard/partners/add-partner/add-partner.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { NotificationComponent } from './components/dashboard/notification/notification.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { HelpComponent } from './components/dashboard/help/help.component';
import { MentorsRequestComponent } from './components/dashboard/mentors-request/mentors-request.component';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { ViewRequestComponent } from './components/dashboard/view-request/view-request.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ReportsComponent} from './dashboard/reports/reports.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
<<<<<<< HEAD
//import { PostsDashboardComponent } from './posts/posts-dashboard/posts-dashboard.component';
import { PostsDetailComponent } from './posts/posts-detail/posts-detail.component';

=======
import { ElearningComponent } from './elearning/elearning.component';
>>>>>>> 006ee66f43994f0f0930f5f5f88ce46c9a05b72d

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
    { path: 'mentors', component: MentorComponent},
    { path: 'careerjobs', component: CareerJobsComponent},
    { path: 'Blogs', component: BlogsComponent},
    { path: 'events', component: EventsComponent},
    { path: 'add-event', component: AddEventComponent},
    { path: 'partners', component: PartnersComponent},
    { path: 'add-partner', component: AddPartnerComponent},
    { path: 'skills', component: SkillsComponent},
    { path: 'categories', component: CategoriesComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'adduser', component: AdduserComponent},
    { path: 'addmentor', component: AddmentorComponent},
    { path: 'timeline', component: TimelineComponent},
  ]},
  
  { path: 'blogs-user', component: BlogsUserComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  { path: 'meet-mentor', component: MeetMentorComponent},
  { path: 'internship', component: InternshipComponent},
  { path: 'career-events', component: CareerEventsComponent},
  { path: 'adduser', component: AdduserComponent},
 //{ path: 'posts-dashboard', component: PostsDashboardComponent},
 { path: 'posts-detail', component: PostsDetailComponent},
  { path: 'addmentor', component: AddmentorComponent},
  // { path: 'notifications', component: NotificationComponent},
  { path: 'edit', component: EditProfileComponent},
  // { path: 'mentors-request', component: MentorsRequestComponent},


   { path: 'profile', component: ProfileComponent,
    children: [
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'help', component: HelpComponent },
      { path: 'notifications', component: NotificationComponent},
      { path: 'requests', component: RequestsComponent},
      { path: 'view-request', component: ViewRequestComponent},
      { path: 'mentors-request', component: MentorsRequestComponent},
    ]},

  { path: 'audit-trail', component: AuditTrailComponent},
  { path: 'image', component: ImageComponent},
  { path: 'image-list', component: ImageListComponent},
  { path: 'elearning', component: ElearningComponent},


];
