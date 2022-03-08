import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  SearchComponent,
  AboutComponent,
  FAQComponent,
  BlogComponent,
  ForgotpasswordComponent,
  CreatepasswordComponent,
  ContactComponent,
  LoginComponent,
  RegistrationComponent,
} from './home';
import { DetailsComponent } from './home/course-details/details.component';

import {
  DashboardComponent,
  DashboardMainComponent,
  DashboardProfileComponent,
  DashboardProfileSettingsComponent,
  DashboardProfileVideoComponent,
} from './dashboard';
import { CatalogDetailsComponent } from './home/catalog-details/catalog-details.component';
/*
import { UsersdashboardComponent } from './dashboard-test/usersdashboard.component';
import { MainHomeComponent } from './dashboard-test/main-home/main-home.component';
import { ProfilingComponent } from './dashboard-test/profiling/profiling.component';
*/
const routes: Routes = [
  /* HOMEPAGE */
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:type', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'reset-password', component: CreatepasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faqs', component: FAQComponent },
  { path: 'blogs', component: BlogComponent },
  { path: 'course/:id', component: DetailsComponent },
  { path: 'catalog/:id', component: CatalogDetailsComponent },

  /* DASHBOARD */
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardMainComponent },
      { path: 'profile', component: DashboardProfileComponent },
      { path: 'settings', component: DashboardProfileSettingsComponent },
      { path: 'video', component: DashboardProfileVideoComponent },

      //{ path: 'home', component: MainHomeComponent },
      // { path: 'courses/:name', component: CourseDetailsComponent },
      // { path: 'catalog/:name', component: CatalogDetailsComponent },
      //{ path: 'about', component: AboutComponent },
      //{ path: 'contact', component: ContactComponent },
      //{ path: 'profile', component: ProfilingComponent },
      //{ path: 'blogs', component: BlogComponent },

      // { path: 'payment', component: PaymentsComponent },
      // { path: 'courses', component: TeachercoursesComponent },
      // { path: 'enrollment', component: EnrollmentComponent },
      // {
      //   path: 'enrollment/:id',
      //   component: EnrollmentDetailsComponent,
      // },
      // { path: 'feedback', component: FeedbackComponent },
    ],
  },

  /* Admin Side Panel */

  //  { path: 'admin', component: AdminLoginComponent },
  //   { path: 'admin-dashboard', component: DashboardComponent },
  //   { path: 'admin-users', component: UsersComponent },
  //   { path: 'admin-certified', component: CertificateComponent },
  //   { path: 'admin-courses', component: CoursesAdminComponent },
  //   { path: 'admin-payment', component: PaymentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
