import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, LocalstorageService } from 'src/app/_services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public data: any = [];
  public user: any;

  constructor(
    public router: Router,
    public activated: ActivatedRoute,
    private UserService: UserService,
    private userdata: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.courseDetail();
    this.getuser();
  }

  getuser() {
    this.user = this.userdata.getUser();
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
          this.router.navigate(['/dashboard/profile']);
        } catch {
          window.alert('Error Occur');
        }
      } else {
        console.log(data);
      }
    });
  }
}
