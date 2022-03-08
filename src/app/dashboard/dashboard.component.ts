import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any = [];
  constructor(private userdata: LocalstorageService) {}

  ngOnInit() {
    this.getuser();
  }

  getuser() {
    this.data = this.userdata.getUser();
  }
}
