import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_services/chat-services/chat.service.service';
import { LocalstorageService } from './../../_services/users-token.services/localstorage.service';

@Component({
  selector: 'app-dashboard-profile-video',
  templateUrl: './dashboard-profile-video.component.html',
  styleUrls: ['./dashboard-profile-video.component.css'],
})
export class DashboardProfileVideoComponent implements OnInit {
  id: any;
  message: any = String;
  messageList: string[] = [];
  constructor(
    private token: LocalstorageService,
    public chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.id = this.token.getUser()._id;
    this.chatService.getMessage(this.id).subscribe((message: string) => {
      this.messageList.push(message);
    });
  }
  sendMessage(data: any) {
    data = this.message;
    this.chatService.sendMessage(data);
    this.message = '';
  }
}
