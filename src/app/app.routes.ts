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

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
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
  { path: 'new-profile', component: NewProfileComponent},
  { path: 'new-student', component: NewStudentComponent},
  { path: 'new-mentor', component: NewMentorComponent},


];
