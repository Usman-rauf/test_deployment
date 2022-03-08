import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket;
  data: any;
  users() {
    throw new Error('Method not implemented.');
  }
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
    this.socket = io(environment.apiUrl);
  }

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getMessage(id: any) {
    this.socket.on('message', (message) => {
      this.message$.next(message);
      this.message$.subscribe(id);
    });

    return this.message$.asObservable();
  }
}
