import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '..//../_services/index';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  forgotpasword: any = FormGroup;
  email: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClientModule,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.forgotpasword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    console.log(this.forgotpasword);
  }

  onClickSubmit(data: any) {
    data = { email: this.forgotpasword.value };
    this.UserService.forgotpassword(data).subscribe((data: any) => {
      console.log(data);
      return;
      if (data.status === 'ok') {
        window.alert('Email Found');
        console.log(data);
      } else {
        window.alert('Invalid Email');
      }
    });
  }
}
