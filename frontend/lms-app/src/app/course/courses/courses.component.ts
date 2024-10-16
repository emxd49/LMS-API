import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { ICourse } from '../../data.model';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { IconHarnessFilters } from '@angular/material/icon/testing';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  constructor(
    private courseService: CourseService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
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
        this.snackBar.open('Course successfully added!', 'Ok', {
          duration: 3000,
        });
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
    console.log('Base component:', data.lessons);
    this.courseService
      // @ts-ignore
      .updateCourse(data._id, course)
      .subscribe((updatedCourse) => {
        console.log('Course updated', updatedCourse);
        // @ts-ignore
        this.courseService.updateLesson(data._id, data.lessons);
        this.loadCourses();
        this.snackBar.open('Course successfully updated!', 'Ok', {
          duration: 3000,
        });
      });
  }

  deleteCourse(courseID: string) {
    this.courseService.deleteCourse(courseID).subscribe((delCourse) => {
      console.log('Deleted Course', delCourse);
      this.courseService.removeEnrolledCourseForAll(courseID);
      this.loadCourses();
      this.snackBar.open('Course successfully deleted!', 'Ok', {
        duration: 3000,
      });
    });
  }

  filterCourse(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (!input) {
      this.filteredCourses = this.courses;
      return;
    }
    this.filteredCourses = this.courses.filter((course) =>
      course?.courseTitle.toLowerCase().includes(input.toLowerCase())
    );
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
          this.courseService.addEnrolledCourses(course._id);
          this.snackBar.open('Enrolled Successfully!', 'Ok', {
            duration: 3000,
          });
          return;
        }
        if (data._id) {
          // update
          this.editCourse(data);
        }
      });
  }
}
