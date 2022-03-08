import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public data: any = [];
  constructor(
    public activated: ActivatedRoute,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.courseDetail();
  }

  courseDetail() {
    this.activated.paramMap.subscribe((params: any) => {
      this.data = params.get('id');
    });
    this.UserService.getCourse(this.data).subscribe((res: any) => {
      if (res) {
        this.data = res.course;
        console.log(this.data);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  enrollCourse(data: any) {
    this.UserService.enrollCourses(data).subscribe((res: any) => {
      if (res) {
        try {
          this.data = res;
          console.log(this.data);
          window.alert('Enrolled Successful');
        } catch {
          window.alert('Error Occur');
        }
      } else {
        console.log(data);
      }
    });
  }
}
