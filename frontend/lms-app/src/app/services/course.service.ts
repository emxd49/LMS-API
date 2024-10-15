import { Injectable } from '@angular/core';
import { CourseModule } from '../course/course.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ICourse,
  ICourseLessons,
  IEnrolledCourses,
  ILesson,
} from '../data.model';
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
  // ================= localStorage Operations ===============
  getEnrolledCourses(user: string): any {
    let rawEnrolledCourses = localStorage.getItem('enrolledCourses');
    if (!rawEnrolledCourses) {
      return null;
    }
    let enrolledCourses: IEnrolledCourses = JSON.parse(rawEnrolledCourses);
    return enrolledCourses[user];
  }
  removeEnrolledCourse(user: string, courseID: string) {
    let rawEnrolledCourses = localStorage.getItem('enrolledCourses');
    if (!rawEnrolledCourses) {
      return;
    }
    const userEnrolledCourse: IEnrolledCourses = JSON.parse(rawEnrolledCourses);
    if (!userEnrolledCourse[user]) {
      return;
    }
    userEnrolledCourse[user] = userEnrolledCourse[user].filter(
      (id) => id !== courseID
    );
    localStorage.setItem('enrolledCourses', JSON.stringify(userEnrolledCourse));
  }
  addEnrolledCourses(username: string, courseID: string) {
    let rawEnrolledCourses = localStorage.getItem('enrolledCourses');
    if (!rawEnrolledCourses) {
      const userEnrolledCourse: IEnrolledCourses = {};
      userEnrolledCourse[username] = [courseID];
      localStorage.setItem(
        'enrolledCourses',
        JSON.stringify(userEnrolledCourse)
      );
      return;
    }
    const enrolledCourses: IEnrolledCourses = JSON.parse(rawEnrolledCourses);
    if (enrolledCourses[username]) {
      if (enrolledCourses[username].includes(courseID)) {
        return;
      }
      enrolledCourses[username].push(courseID);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      return;
    }
    enrolledCourses[username] = [courseID];
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }
  getLessons(courseID: string) {
    let rawLessons = localStorage.getItem('lessons');
    if (!rawLessons) {
      return undefined;
    }
    let courseLessons: ICourseLessons = JSON.parse(rawLessons);
    return courseLessons[courseID];
  }
  addLesson(courseID: string, lesson: ILesson[]) {
    let rawLessons = localStorage.getItem('lessons');
    if (!rawLessons) {
      const courseLessons: ICourseLessons = {};
      courseLessons[courseID] = lesson;
      localStorage.setItem('lessons', JSON.stringify(courseLessons));
      return;
    }
    let courseLessons: ICourseLessons = JSON.parse(rawLessons);
    if (!courseLessons[courseID]) {
      courseLessons[courseID] = lesson;
      localStorage.setItem('lessons', JSON.stringify(courseLessons));
      return;
    }
    for (const l of lesson) {
      const foundLesson = courseLessons[courseID].filter(
        (less) => less.title == l.title
      );
      if (foundLesson.length > 0) {
        continue;
      }
      courseLessons[courseID].push(l);
    }
    localStorage.setItem('lessons', JSON.stringify(courseLessons));
    return;
  }
  updateLesson(courseID: string, lessons: ILesson[]) {
    let rawLessons = localStorage.getItem('lessons');
    if (!rawLessons) {
      const courseLessons: ICourseLessons = {};
      courseLessons[courseID] = lessons;
      localStorage.setItem('lessons', JSON.stringify(courseLessons));
      return;
    }
    let courseLessons: ICourseLessons = JSON.parse(rawLessons);
    courseLessons[courseID] = lessons;
    localStorage.setItem('lessons', JSON.stringify(courseLessons));
    return;
  }
}
