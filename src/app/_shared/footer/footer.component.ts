import { Component, OnInit } from '@angular/core';
import { LocalstorageService, UserService } from '..//../_services/index';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  loggedData: any;
  user: any;

  constructor(
    private authService: SocialAuthService,
    public UserService: UserService
  ) {}
  ngOnInit() {}

  loggedIn(user: any) {
    user = false;
  }

  public googleLogin(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: any) => {
        const response = res;
        console.log(response);
        let type = 'Google';
        this.loggedData = { response, type };
        if (this.loggedData) {
          this.UserService.SocialLogin(this.loggedData).subscribe(
            (data: any) => {
              console.log(data);
            }
          );
        } else {
          window.alert('Error Occured');
          (err: any) => {
            console.log(err);
          };
        }
      });
  }

  public facebookLogin(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res: any) => {
        const response = res;
        let type = 'Facebook';
        this.loggedData = { response, type };
        if (this.loggedData) {
          this.UserService.SocialLogin(this.loggedData).subscribe(
            (data: any) => {
              console.log(data);
            }
          );
        } else {
          window.alert('Error Occured');
          (err: any) => {
            console.log(err);
          };
        }
      });
  }
}
