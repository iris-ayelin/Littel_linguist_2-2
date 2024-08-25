import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-return-answer-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './return-answer-dialog.component.html',
  styleUrl: './return-answer-dialog.component.css'
})

export class ReturnAnswerDialogComponent {

  feedbackMessage: string;
  isCorrect: boolean;

  constructor(
    public dialogRef: MatDialogRef<ReturnAnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feedbackMessage: string, isCorrect: boolean }
  ) {
    this.feedbackMessage = data.feedbackMessage;
    this.isCorrect = data.isCorrect;
  }

  onClose() {
    this.dialogRef.close(); // Close the dialog
  }
}