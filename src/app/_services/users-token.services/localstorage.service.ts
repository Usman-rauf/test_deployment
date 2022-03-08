import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = sessionStorage.getItem('token');
    if (currentUser) {
      request = request.clone({
        headers: request.headers.set('authorization', currentUser),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    // console.log(request);
    return next.handle(request);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(user);
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }
  public getUser(): any {
    const data = window.sessionStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
  }
}
