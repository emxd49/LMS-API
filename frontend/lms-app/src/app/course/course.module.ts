import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseService } from '../services/course.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CoursesComponent,
    EnrolledCoursesComponent,
    CourseCardComponent,
  ],
  imports: [CommonModule, CourseRoutingModule],
  providers: [CourseService],
})
export class CourseModule {}
