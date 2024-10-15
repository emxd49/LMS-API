import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { ICourse } from '../../data.model';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { IconHarnessFilters } from '@angular/material/icon/testing';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  dialog = inject(MatDialog);
  courses: ICourse[] = [];
  constructor(
    private courseService: CourseService,
    private router: Router // private authService: AuthService
  ) {}
  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(courses);
    });
  }

  addCourse() {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      minHeight: '80%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe((data: ICourse | undefined) => {
      if (!data) {
        return;
      }
      this.courseService.addCourse(data).subscribe((course) => {
        console.log(course);
        this.loadCourses();
      });
    });
  }

  editCourse(data: ICourse) {
    const course: ICourse = {
      courseTitle: data.courseTitle,
      courseType: data.courseType,
      description: data.description,
      duration: data.duration,
      created_date: data.created_date,
    };
    console.log("Base component:", data.lessons);
    this.courseService
      // @ts-ignore
      .updateCourse(data._id, course)
      .subscribe((updatedCourse) => {
        console.log('Course updated', updatedCourse);
        // @ts-ignore
        this.courseService.addLesson(data._id, data.lessons);
        this.loadCourses();
      });
  }

  deleteCourse(courseID: string) {
    this.courseService.deleteCourse(courseID).subscribe((delCourse) => {
      console.log('Deleted Course', delCourse);
      this.loadCourses();
    });
  }

  openCourse(course: ICourse) {
    const dialog = this.dialog.open(CourseDetailsComponent, {
      data: course,
      // minHeight: '80%',
      width: '90%',
    });
    dialog
      .afterClosed()
      .subscribe((data: ICourse | 'del' | 'enrol' | undefined) => {
        if (!data) {
          return;
        }
        if (data == 'del') {
          // @ts-ignore
          this.deleteCourse(course._id);
          return;
        }
        if (data == 'enrol') {
          // @ts-ignore
          this.courseService.addEnrolledCourses('emad', course._id);
          return;
        }
        if (data._id) {
          // update
          this.editCourse(data);
        }
      });
  }
}
