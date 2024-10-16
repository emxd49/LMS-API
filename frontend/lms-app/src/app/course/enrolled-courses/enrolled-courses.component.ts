import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import {
  BehaviorSubject,
  firstValueFrom,
  forkJoin,
  lastValueFrom,
  Observable,
  of,
} from 'rxjs';
import { ICourse } from '../../data.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrl: './enrolled-courses.component.scss',
})
export class EnrolledCoursesComponent {
  displayedColumns: string[] = ['title', 'type', 'description', 'unenroll'];
  dataSource: any = new MatTableDataSource();
  enrolledCoursesList: ICourse[] = [];
  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loadEnrolledCourses();
  }
  loadEnrolledCourses() {
    const enrolledCourses = this.courseService.getEnrolledCourses();
    if (!enrolledCourses || enrolledCourses.length == 0) {
      this.dataSource = [];
      return;
    }
    const getCoursesObs = [];
    for (const eCourse of enrolledCourses) {
      getCoursesObs.push(this.courseService.getCourse(eCourse));
    }
    const observable = forkJoin(getCoursesObs);
    observable.subscribe((data) => {
      this.dataSource = data;
    });
  }

  deleteEnrolledCourse(courseID: string) {
    this.courseService.removeEnrolledCourse(courseID);
    this.loadEnrolledCourses();
  }
}
