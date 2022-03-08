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
  public userData: any = [];
  public searchData: any = [];
  public result: any = false;
  public price: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UserService: UserService
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
    this.getUsers();
  }

  toggleMoreFilters() {
    this.morefilters = this.morefilters ? false : true;
  }

  counter(i: number) {
    return new Array(i);
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
          this.userData = data[0];
          console.log(this.userData);
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
        this.searchData = data;
        console.log(this.searchData);
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
    this.UserService.getteacherUser().subscribe((data: any) => {
      if (data) {
        this.userData = data.users;
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
}
