import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  heading: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
  ngOnInit() {
    this.heading = this.data;
  }

  close(val: true | undefined) {
    this.dialogRef.close(val);
  }
}
