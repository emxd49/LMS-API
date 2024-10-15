import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICourse, ILesson } from '../../data.model';
import { CourseService } from '../../services/course.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICourse,
    public dialogRef: MatDialogRef<CourseFormComponent>
  ) {}
  courseOptions = ['Certification', 'Free', 'Video', 'Interactive'];
  currentLessons: ILesson[] = [];
  courseForm = new FormGroup({
    _id: new FormControl<string | null>(null),
    courseTitle: new FormControl('', [Validators.required]),
    courseType: new FormControl('', [Validators.required]),
    lessons: new FormControl<ILesson[]>([]),
    description: new FormControl('', [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required]),
    created_date: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit() {
    if (this.data && this.data._id) {
      this.courseForm.patchValue({
        _id: this.data._id,
        courseTitle: this.data.courseTitle,
        courseType: this.data.courseType,
        // lessons: this.data.lessons,
        description: this.data.description,
        duration: this.data.duration,
        created_date: this.data.created_date,
      });
      this.currentLessons = this.data.lessons || [];
    }
    console.log('form comp', this.data.lessons);
  }

  addLesson() {
    const newLessonDialog = this.dialog.open(LessonFormComponent, {
      minHeight: '80%',
      width: '90%',
    });
    newLessonDialog.afterClosed().subscribe((data) => {
      this.currentLessons.push(data);
    });
  }

  handleSubmit() {
    this.courseForm.patchValue({ lessons: this.currentLessons });
    this.dialogRef.close(this.courseForm.value);
  }
}
