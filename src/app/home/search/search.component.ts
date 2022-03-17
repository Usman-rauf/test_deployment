import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '..//../_services/index';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  public morefilters: boolean = false;
  public type: any = 'search';
  public title: string = '';
  public selected: any;
  public data: any = [];
  public searchquery: any;
  public courseData: any = [];
  public catalogData: any = [];
  public userteacherData: any = [];
  public usefreelancerData: any = [];
  public userenterpriseData: any = [];
  public result: any = false;
  public price: any;

  public searchUser: any = [];
  public searchCourse: any = [];
  public searchCatalog: any = [];

  public searchData: any = [];
  public searchData1: any = [];
  public searchData2: any = [];
  public searchData3: any = [];
  public usersData: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UserService: UserService,
    public activated: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.type = params['type'] || 'search';
      if (this.type === 'search') this.title = 'Everything';
      if (this.type === 'teachers') this.title = 'Tutors';
      if (this.type === 'enterprises') this.title = 'Enterprises';
      if (this.type === 'freelancers') this.title = 'Freelancers';
      if (this.type === 'courses') this.title = 'Courses';
      if (this.type === 'catalogs') this.title = 'Catalogs';
    });
  }

  ngAfterViewInit(): void {
    this.getAllCourses();
    this.getAllCatalogs();
    this.getteacherUsers();
    this.getfreelancerUsers();
    this.getenterpriseUsers();
    this.getAllCourses();
    this.getAllCatalogs();
    this.searchResult();
    this.getUsers();
  }

  toggleMoreFilters() {
    this.morefilters = this.morefilters ? false : true;
  }

  counter(i: number) {
    return new Array(i);
  }

  searchResult() {
    this.result = true;
    this.route.queryParams.subscribe((params) => {
      this.data = params['q'];
    });

    this.UserService.searchData(this.data).subscribe((data: any) => {
      if (data) {
        this.searchUser = data[0].Users;
        this.searchCourse = data[1].Course;
        this.searchCatalog = data[2].Catalog;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  onkey(event: any) {
    if (event.keyCode === 13) {
      this.result = true;
      const searchType = this.type;
      let data = { searchType, query: this.searchquery, price: this.price };
      this.UserService.getsearch(data).subscribe((data: any) => {
        if (data) {
          this.courseData = data[0];
          this.catalogData = data[0];
          this.userteacherData = data[0];
          this.usefreelancerData = data[0];
          this.userenterpriseData = data[0];
        }
        (err: any) => {
          console.log(err);
        };
      });
    }
  }

  search(event: any) {
    const searchType = event.target.value;
    const price = event.target.value;
    let data = { searchType, query: this.searchquery, price };
    this.UserService.getsearch(data).subscribe((data: any) => {
      if (data) {
        console.log(data);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  priceslider(event: any) {
    const searchType = this.type;
    this.price = event.target.value;
    let data = { searchType, query: this.searchquery, price: this.price };
    this.UserService.getsearch(data).subscribe((data: any) => {
      if (data) {
        window.alert('Searched Successfully');
        console.log(data);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getUsers() {
    this.UserService.getUsers().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.usersData = data.users;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getteacherUsers() {
    this.UserService.getteacherUser().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.userteacherData = data.users;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getfreelancerUsers() {
    this.UserService.getfreelancerUser().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.usefreelancerData = data.users;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getenterpriseUsers() {
    this.UserService.getenterpriseUser().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.userenterpriseData = data.users;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getAllCourses() {
    this.UserService.getAllCourses().subscribe((data: any) => {
      console.log(data);
      if (data.status == 'ok') {
        this.courseData = data.course;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getAllCatalogs() {
    this.UserService.getAllCatalogs().subscribe((data: any) => {
      console.log(data);
      if (data.status == 'ok') {
        this.catalogData = data.catalog;
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  getCourse(id: any) {
    this.router.navigate(['/course', id]);
    (err: any) => {
      console.log(err);
    };
  }

  getCatalog(id: any) {
    this.router.navigate(['/catalog', id]);
    (err: any) => {
      console.log(err);
    };
  }

  getUser(id: any) {
    this.router.navigate(['/profile', id]);
    (err: any) => {
      console.log(err);
    };
  }
}
