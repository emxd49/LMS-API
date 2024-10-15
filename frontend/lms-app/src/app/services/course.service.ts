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
import { AuthService } from './auth.service';

@Injectable({
  providedIn: CourseModule,
})
export class CourseService {
  baseURL = 'http://localhost:5000/api/course';
  user: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    // @ts-ignore
    this.user = this.authService.getUser();
  }
  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.baseURL}/${id}`);
  }
  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.baseURL);
  }
  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  updateCourse(id: string, course: ICourse) {
    return this.http.put(`${this.baseURL}/${id}`, course);
  }
  addCourse(course: ICourse) {
    return this.http.post(this.baseURL, course);
  }
  // ================= localStorage Operations ===============
  getEnrolledCourses(): any {
    let rawEnrolledCourses = localStorage.getItem('enrolledCourses');
    if (!rawEnrolledCourses) {
      return null;
    }
    let enrolledCourses: IEnrolledCourses = JSON.parse(rawEnrolledCourses);
    return enrolledCourses[this.user];
  }
  removeEnrolledCourse(courseID: string) {
    let rawEnrolledCourses = localStorage.getItem('enrolledCourses');
    if (!rawEnrolledCourses) {
      return;
    }
    const userEnrolledCourse: IEnrolledCourses = JSON.parse(rawEnrolledCourses);
    if (!userEnrolledCourse[this.user]) {
      return;
    }
    userEnrolledCourse[this.user] = userEnrolledCourse[this.user].filter(
      (id) => id !== courseID
    );
    localStorage.setItem('enrolledCourses', JSON.stringify(userEnrolledCourse));
  }
  addEnrolledCourses(courseID: string) {
    let rawEnrolledCourses = localStorage.getItem('enrolledCourses');
    if (!rawEnrolledCourses) {
      const userEnrolledCourse: IEnrolledCourses = {};
      userEnrolledCourse[this.user] = [courseID];
      localStorage.setItem(
        'enrolledCourses',
        JSON.stringify(userEnrolledCourse)
      );
      return;
    }
    const enrolledCourses: IEnrolledCourses = JSON.parse(rawEnrolledCourses);
    if (enrolledCourses[this.user]) {
      if (enrolledCourses[this.user].includes(courseID)) {
        return;
      }
      enrolledCourses[this.user].push(courseID);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      return;
    }
    enrolledCourses[this.user] = [courseID];
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
