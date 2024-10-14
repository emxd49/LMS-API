import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.scss',
})
export class LessonFormComponent {
  constructor(public dialogRef: MatDialogRef<LessonFormComponent>) {}
  lessonForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required]),
  });

  handleSubmit() {
    this.dialogRef.close(this.lessonForm.value);
  }
}
