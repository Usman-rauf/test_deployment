import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css'],
})
export class HomeProfileComponent implements OnInit {
  data: any = [];
  course: any = [];
  catalog: any = [];
  achievement: any = [];

  constructor(
    private UserService: UserService,
    public router: Router,
    public activated: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getuser();
  }

  getuser() {
    this.activated.paramMap.subscribe((params: any) => {
      this.data = params.get('id');
    });
    this.UserService.publicViewprofile(this.data).subscribe((res: any) => {
      if (res) {
        this.data = res.profile;
        console.log(this.data);
        this.course = res.output;
        console.log(this.course);
        this.catalog = res.output1;
        console.log(this.catalog);
        this.achievement = res.output3;
        console.log(this.achievement);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
}
