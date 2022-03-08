import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public slides = [
    {img: "../../assets/homepage/photography.jpg"},
    {img: "../../assets/homepage/photography.jpg"},
    {img: "../../assets/homepage/photography.jpg"},
    {img: "../../assets/homepage/photography.jpg"},
    {img: "../../assets/homepage/photography.jpg"},
    {img: "../../assets/homepage/photography.jpg"},
    {img: "../../assets/homepage/photography.jpg"},
  ];
  public slideConfig = {
    "slidesToShow": 5, 
    "slidesToScroll": 1,
    "autoplay" : true,
    "autoplaySpeed" : 3000,
    "centerMode" : false,
    "lazyLoad" : 'ondemand',
    "responsive" : [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  public slideConfig2 = {
    "slidesToShow": 4, 
    "slidesToScroll": 1,
    "autoplay" : true,
    "autoplaySpeed" : 3000,
    "centerMode" : false,
    "lazyLoad" : 'ondemand',
    "responsive" : [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
