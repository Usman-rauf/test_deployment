import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  SocialAuthService,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { LocalstorageService } from './_services';

/* Navbar & Footer */
import { HeaderComponent, FooterComponent } from './_shared';

/* Slider Content */
import { SlickCarouselModule } from 'ngx-slick-carousel';

/* User Content */
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
  HomeProfileComponent,
} from './home';

import {
  DashboardComponent,
  DashboardMainComponent,
  DashboardProfileComponent,
} from './dashboard';

/* User Logged-In Content */
import { UsersdashboardComponent } from './dashboard-test/usersdashboard.component';
import { SidebarComponent } from './dashboard-test/sidebar/sidebar.component';
import { MainHomeComponent } from './dashboard-test/main-home/main-home.component';
import { ProfilingComponent } from './dashboard-test/profiling/profiling.component';

/* Admin Content */
import {
  AdminLoginComponent,
  UsersComponent,
  CertificateComponent,
  CoursesAdminComponent,
  PaymentComponent,
} from './Admin';

/* Forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Calender */
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { DashboardProfileSettingsComponent } from './dashboard/dashboard-profile-settings/dashboard-profile-settings.component';
import { DashboardProfileVideoComponent } from './dashboard/dashboard-profile-video/dashboard-profile-video.component';
import { DetailsComponent } from './home/course-details/details.component';
import { CatalogDetailsComponent } from './home/catalog-details/catalog-details.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    ContactComponent,
    ForgotpasswordComponent,
    CreatepasswordComponent,
    AdminLoginComponent,
    UsersComponent,
    CertificateComponent,
    CoursesAdminComponent,
    PaymentComponent,
    UsersdashboardComponent,
    SidebarComponent,
    MainHomeComponent,
    ProfilingComponent,
    FAQComponent,
    BlogComponent,
    HomeProfileComponent,
    // DASHBOARD COMPONENTS
    DashboardComponent,
    DashboardMainComponent,
    DashboardProfileComponent,
    DashboardProfileSettingsComponent,
    DashboardProfileVideoComponent,
    DetailsComponent,
    CatalogDetailsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    SlickCarouselModule,
  ],
  providers: [
    SocialLoginModule,
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '680050613369-9ot7rf8v7ccmpkipqo1f08mshp58jegn.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1271542040025749'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LocalstorageService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
