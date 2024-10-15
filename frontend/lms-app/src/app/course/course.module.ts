import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseService } from '../services/course.service';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { CourseFormComponent } from './course-form/course-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatIcon } from '@angular/material/icon';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { MatTableModule } from '@angular/material/table';
import { authInterceptor } from '../interceptors/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    CoursesComponent,
    EnrolledCoursesComponent,
    CourseCardComponent,
    CourseFormComponent,
    CourseDetailsComponent,
    LessonFormComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatIconButton,
    MatIcon,
    MatTableModule,
  ],
  providers: [
    CourseService,
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
})
export class CourseModule {}
