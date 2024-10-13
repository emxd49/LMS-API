import { Injectable } from '@angular/core';
import { CourseModule } from '../course/course.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICourse } from '../data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: CourseModule,
})
export class CourseService {
  baseURL = 'http://localhost:5000/api/course';
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('accessToken');
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }
  getCourse(id: string): Observable<ICourse> {
    const headers = this.getHeaders();
    return this.http.get<ICourse>(`${this.baseURL}/${id}`, { headers });
  }
  getCourses(): Observable<ICourse[]> {
    const headers = this.getHeaders();
    return this.http.get<ICourse[]>(this.baseURL, { headers });
  }
  deleteCourse(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseURL}/${id}`, { headers });
  }
  updateCourse(id: string, course: ICourse) {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseURL}/${id}`, course, { headers });
  }
  addCourse(course: ICourse) {
    const headers = this.getHeaders();
    return this.http.post(this.baseURL, course, { headers });
  }
}
