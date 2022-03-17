import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /* User Login/Registration Services */
  create(user: any) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${environment.apiUrl}/login`, user);
  }

  SocialLogin(user: any) {
    return this.http.post(`${environment.apiUrl}/socialLogin`, user);
  }

  forgotpassword(user: any) {
    return this.http.post(`${environment.apiUrl}/forgot-password`, user);
  }

  createpassword(user: any) {
    return this.http.post(`${environment.apiUrl}/create-password`, user);
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/users`);
  }
  getteacherUser() {
    return this.http.get(`${environment.apiUrl}/specific-tuser`);
  }

  getfreelancerUser() {
    return this.http.get(`${environment.apiUrl}/specific-fuser`);
  }

  getenterpriseUser() {
    return this.http.get(`${environment.apiUrl}/specific-euser`);
  }

  /* User Courses Services */

  addCourse(data: any) {
    console.log(data);
    return this.http.post(`${environment.apiUrl}/course`, data);
  }

  getAllCourses() {
    return this.http.get(`${environment.apiUrl}/get-courses`);
  }

  getteacherCourses() {
    return this.http.get(`${environment.apiUrl}/teacher-courses`);
  }

  getstudentCourses() {
    return this.http.get(`${environment.apiUrl}/students-courses`);
  }

  getCourse(data: any) {
    let params = new HttpParams().append('id', data);
    console.log('Params', params);
    return this.http.get(`${environment.apiUrl}/single-course`, {
      params: params,
    });
  }

  updateCourse(data: any) {
    console.log(data);
    return this.http.put(`${environment.apiUrl}/course`, data);
  }

  deleteCourse(data: any) {
    let params = new HttpParams().append('id', data);
    console.log('Params', params);
    return this.http.delete(`${environment.apiUrl}/course`, { params: params });
  }

  /* User Catalog Services */

  addCatalog(data: any) {
    return this.http.post(`${environment.apiUrl}/catalog`, data);
  }

  getAllCatalogs() {
    return this.http.get(`${environment.apiUrl}/get-catalogs`);
  }

  getteacherCatalogs() {
    return this.http.get(`${environment.apiUrl}/teacher-catalogs`);
  }

  getstudentCatalogs() {
    return this.http.get(`${environment.apiUrl}/students-catalogs`);
  }

  getCatalog(data: any) {
    let params = new HttpParams().append('id', data);
    console.log('Params', params);
    return this.http.get(`${environment.apiUrl}/single-catalog`, {
      params: params,
    });
  }

  updateCatalog(data: any) {
    return this.http.put(`${environment.apiUrl}/catalog`, data);
  }

  deleteCatalog(data: any) {
    let params = new HttpParams().append('id', data);
    console.log('Params', params);
    return this.http.delete(`${environment.apiUrl}/catalog`, {
      params: params,
    });
  }

  enrollCourses(data: any) {
    return this.http.post(`${environment.apiUrl}/enroll-course`, data);
  }

  enrollCatalog(data: any) {
    return this.http.post(`${environment.apiUrl}/buy-catalog`, data);
  }

  /* User Search Services */

  getsearch(data: any = {}) {
    let params = new HttpParams()
      .append('type', data.searchType)
      .append('searchquery', data.query)
      .append('price', data.price);
    return this.http.get(`${environment.apiUrl}/search`, { params: params });
  }

  searchData(data: any = {}) {
    let params = new HttpParams().append('q', data);
    return this.http.get(`${environment.apiUrl}/searched`, { params: params });
  }

  /* User Contact Services */

  sendContact(data: any) {
    return this.http.post(`${environment.apiUrl}/contact`, data);
  }

  /* User Achievement Services */

  addAchievement(data: any) {
    console.log(data);
    return this.http.post(`${environment.apiUrl}/achievements`, data);
  }

  getAchievement(data: any) {
    return this.http.get(`${environment.apiUrl}/achievements`, data);
  }

  deleteAchievement(data: any) {
    return this.http.delete(`${environment.apiUrl}/achievements`, data);
  }

  /* User Blogs Services */

  getBlogs() {
    return this.http.get(`${environment.apiUrl}/blogs`);
  }

  publicProfile(data: any) {
    let params = new HttpParams().append('id', data);
    console.log('Params', params);
    return this.http.get(`${environment.apiUrl}/home-profile`, {
      params: params,
    });
  }

  /* User Profiles Services */

  userprofile(data: any) {
    return this.http.get(`${environment.apiUrl}/profile`, data);
  }

  publicViewprofile(data: any) {
    let params = new HttpParams().append('id', data);
    console.log('Params', params);
    return this.http.get(`${environment.apiUrl}/home-profile`, {
      params: params,
    });
  }

  userRatings(data: any) {
    return this.http.post(`${environment.apiUrl}/ratings`, data);
  }

  updateBio(data: any) {
    console.log(data);
    return this.http.put(`${environment.apiUrl}/user-bio`, data);
  }

  updateEducation(data: any) {
    console.log(data);
    return this.http.put(`${environment.apiUrl}/user-education`, data);
  }

  settings(data: any) {
    return this.http.post(`${environment.apiUrl}/settings`, data);
  }
}
