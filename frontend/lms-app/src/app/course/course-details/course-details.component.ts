import { Component, inject, Inject } from '@angular/core';
import { ICourse, ILesson } from '../../data.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseService } from '../../services/course.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

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
      .getEnrolledCourses()
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
      console.log('course details comp', data);
      this.dialogRef.close(data);
    });
  }
  deleteCourse() {
    const delDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'Delete Course',
    });
    delDialog.afterClosed().subscribe((data: undefined | Boolean) => {
      console.log(data);
      if (!data) {
        return;
      }
      this.dialogRef.close('del');
    });
  }

  enrollCourse() {
    this.dialogRef.close('enrol');
  }
}
