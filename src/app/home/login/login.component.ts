import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService, UserService } from '..//../_services/index';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;
  email: any;
  loggedData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private token: LocalstorageService,
    private UserService: UserService,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onClickSubmit(user: any) {
    this.UserService.login(user).subscribe((data: any) => {
      if (data.status === 'ok') {
        window.alert('Success User Logged In');
        this.token.saveToken(data.token);
        this.token.saveUser(data.user);
        this.router.navigate(['/dashboard']);
      } else {
        window.alert('Invalid username/password');
        console.log(data);
      }
    });
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
