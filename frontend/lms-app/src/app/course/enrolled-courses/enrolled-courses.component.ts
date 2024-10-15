import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';
import { ICourse } from '../../data.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrl: './enrolled-courses.component.scss',
})
export class EnrolledCoursesComponent {
  displayedColumns: string[] = ['title', 'type', 'description'];
  enrolledCoursesList$!: Observable<ICourse[]>;
  enrolledCoursesSource: MatTableDataSource<ICourse> = new MatTableDataSource();
  constructor(private courseService: CourseService) {}
  ngOnInit() {
    // const enrolledCourses = this.courseService.getEnrolledCourses('emad');
    // if (enrolledCourses && enrolledCourses.length > 0) {
    //   for (const eCourse of enrolledCourses) {
    //     lastValueFrom(this.courseService.getCourse(eCourse)).then(
    //       (courseDetails) => {
    //         this.enrolledCoursesList$.push(of(courseDetails));
    //       }
    //     );
    //   }
    // }
  }

  loadCourses() {

  }

  ngAfterViewInit() {

  }
  deleteEnrolledCourse() {}
}
