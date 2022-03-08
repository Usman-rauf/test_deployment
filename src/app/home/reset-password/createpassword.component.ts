import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services';
@Component({
  selector: 'app-createpassword',
  templateUrl: './createpassword.component.html',
  styleUrls: ['./createpassword.component.css'],
})
export class CreatepasswordComponent implements OnInit {
  login: any = FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private UserService: UserService) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  onClickSubmit(user: any) {
    console.log(this.login.value);
    this.UserService.createpassword(user).subscribe((data: any) => {
      if (data.status == 'ok') {
        try {
          window.alert('Password Changed Successfully');
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }
}
