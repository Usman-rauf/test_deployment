import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '..//../_services/index';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contact: any = FormGroup;
  loggedData: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClientModule,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.contact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      country: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onClickSubmit(user: any) {
    this.UserService.sendContact(user).subscribe((data: any) => {
      if (data.status === 'ok') {
        window.alert('Message Sent Successfully');
        console.log(data);
      } else {
        (err: any) => {
          window.alert('Message not Sent');
          console.log(err);
        };
      }
    });
  }
}
