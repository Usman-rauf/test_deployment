import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  register: any = FormGroup;
  showPassword = false;
  loggedData: any;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onClickSubmit(user: any) {
    console.log(this.register.value);
    this.UserService.create(user).subscribe((data: any) => {
      if (data.status == 'ok') {
        try {
          window.alert('Registration successful');
        } catch {
          window.alert('Invalid username/password');
        }
      } else {
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
