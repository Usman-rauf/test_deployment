import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocalstorageService, UserService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public data: any = [];
  public searchquery: any;
  public getCourses: any = [];
  public getCatalogs: any = [];
  public searchData = new Array();
  public userteacherData: any = [];
  public usefreelancerData: any = [];
  public userenterpriseData: any = [];

  constructor(
    private userdata: LocalstorageService,
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit() {
    this.getuser();
    this.getteacherUsers();
    this.getfreelancerUsers();
    this.getenterpriseUsers();
    this.getAllCourses();
    this.getAllCatalogs();
  }

  getuser() {
    this.data = this.userdata.getUser();
  }

  usersSearched(event: any) {
    if (event.keyCode === 13) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchquery },
      });
      (err: any) => {
        console.log(err);
      };
    }
  }

  getteacherUsers() {
    this.UserService.getteacherUser().subscribe((data: any) => {
      if (data) {
        this.userteacherData = data.users;
        if (this.userteacherData.length > 0) {
          for (let user of this.userteacherData) {
            this.searchData.push(user.name);
          }
        }
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getfreelancerUsers() {
    this.UserService.getfreelancerUser().subscribe((data: any) => {
      if (data) {
        this.usefreelancerData = data.users;
        if (this.usefreelancerData.length > 0) {
          for (let user of this.usefreelancerData) {
            this.searchData.push(user.name);
          }
        }
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getenterpriseUsers() {
    this.UserService.getenterpriseUser().subscribe((data: any) => {
      if (data) {
        this.userenterpriseData = data.users;
        if (this.userenterpriseData.length > 0) {
          for (let user of this.userenterpriseData) {
            this.searchData.push(user.name);
          }
        }
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getAllCourses() {
    this.UserService.getAllCourses().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.getCourses = data.course;
        console.log(this.getCourses);
        if (this.getCourses.length > 0) {
          for (let course of this.getCourses) {
            this.searchData.push(course.coursename);
          }
        }
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getAllCatalogs() {
    this.UserService.getAllCatalogs().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.getCatalogs = data.catalog;
        if (this.getCatalogs.length > 0) {
          for (let catalog of this.getCatalogs) {
            this.searchData.push(catalog.catalogname);
          }
        }
        console.log(this.searchData);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
}
