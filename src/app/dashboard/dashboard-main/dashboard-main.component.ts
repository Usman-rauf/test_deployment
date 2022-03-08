import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { LocalstorageService } from '../../_services/index';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})

// dayGridMonth/dayGridWeek/dayGrid, timeGridWeek
export class DashboardMainComponent implements OnInit {
  data: any = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    themeSystem: 'standard',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'Maths 1', date: new Date('2022-01-25 03:14 PM') },
      { title: 'English', date: new Date('2022-01-29 03:14 PM') },
      { title: 'Physics', date: new Date('2022-01-27 05:14 PM') },
    ],
    eventColor: '#fff',
    headerToolbar: {
      left: 'dayGridMonth,listWeek,timeGridDay',
      center: 'title',
      right: 'prevYear,prev,next,nextYear',
    },
    nowIndicator: true,
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'Week',
    },
  };

  constructor(private userdata: LocalstorageService) {}

  ngOnInit() {
    this.getuser();
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  getuser() {
    this.data = this.userdata.getUser();
    console.log(this.data);
  }
}
