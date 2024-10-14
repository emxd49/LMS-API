import { Component, inject, Inject } from '@angular/core';
import { ICourse, ILesson } from '../../data.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent {
  enrolled: boolean = false;
  dialog = inject(MatDialog);
  constructor(
    private dialogRef: MatDialogRef<CourseDetailsComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: ICourse
  ) {}

  ngOnInit() {
    this.enrolled = this.courseService
      .getEnrolledCourses('emad')
      ?.includes(this.data._id);
  }

  editCourse() {
    const editDialogRef = this.dialog.open(CourseFormComponent, {
      data: this.data,
      minHeight: '80%',
      width: '90%',
    });
    editDialogRef.afterClosed().subscribe((data: ICourse | undefined) => {
      if (!data) {
        return;
      }
      this.dialogRef.close(data);
    });
  }
  deleteCourse() {
    this.dialogRef.close('del');
  }

  enrollCourse() {
    this.dialogRef.close('enrol');
  }
}
