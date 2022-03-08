import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './../../_services/users-token.services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  data: any = [];
  constructor(private userdata: LocalstorageService) {}
  ngOnInit() {
    this.getuser();
  }

  getuser() {
    this.data = this.userdata.getUser();
  }
}
