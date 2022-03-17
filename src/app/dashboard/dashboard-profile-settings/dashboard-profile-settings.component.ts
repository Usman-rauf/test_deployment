import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-dashboard-profile-settings',
  templateUrl: './dashboard-profile-settings.component.html',
  styleUrls: ['./dashboard-profile-settings.component.css'],
})
export class DashboardProfileSettingsComponent implements OnInit {
  settingsInfo: any = FormGroup;
  settingsPassword: any = FormGroup;
  showPassword = false;
  data: any;
  constructor(private fb: FormBuilder, private UserService: UserService) {}

  ngOnInit(): void {
    this.settingsInfo = this.fb.group({
      name: [''],
      email: ['', [Validators.email]],
    });
    this.settingsPassword = this.fb.group({
      currentpassword: [''],
      newpassword: [''],
      confirmpassword: [''],
    });
  }

  UserInfo(user: any) {
    console.log(this.settingsInfo.value);
    this.UserService.settings(user).subscribe((data: any) => {
      if (data) {
        try {
          window.alert('User Info Changed Successfully');
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }

  onClickSubmit(user: any) {
    console.log(this.settingsPassword.value);
    this.UserService.settings(user).subscribe((data: any) => {
      if (data) {
        try {
          console.log(data);
          window.alert('User Info Changed Successfully');
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }
}
