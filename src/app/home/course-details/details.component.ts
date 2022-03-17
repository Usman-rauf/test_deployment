import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, LocalstorageService } from 'src/app/_services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  public data: any = [];
  public user: any;
  public courseData: any = [];
  public catalogData: any = [];
  public enrolledsCatalog: any = [];
  public enrolledsCourse: any = [];
  public result = true;

  constructor(
    public router: Router,
    public activated: ActivatedRoute,
    private UserService: UserService,
    private userdata: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.courseDetail();
    this.getuser();

    this.getstudentCourses();
  }

  ngAfterViewInit(): void {}

  getuser() {
    this.user = this.userdata.getUser();
  }

  courseDetail() {
    this.activated.paramMap.subscribe((params: any) => {
      this.data = params.get('id');
    });
    this.UserService.getCourse(this.data).subscribe((res: any) => {
      if (res) {
        this.courseData = res.course;
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

  getstudentCourses() {
    this.UserService.getstudentCourses().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.enrolledsCourse = data.course;
        for (let user of this.enrolledsCourse) {
          if (this.data == user.courseId) {
            this.result = false;
          }
        }
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
}
