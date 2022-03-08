import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '..//../_services/index';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  user: any;
  public slides: any = [];
  public slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(
    private http: HttpClientModule,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.getblogs();
  }

  getblogs() {
    this.UserService.getBlogs().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.slides = data.blog;
        console.log(data);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
}
