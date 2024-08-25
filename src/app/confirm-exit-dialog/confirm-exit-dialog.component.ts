import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-exit-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './confirm-exit-dialog.component.html',
  styleUrl: './confirm-exit-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmExitDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmExitDialogComponent>,
    private router: Router,
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    this.router.navigate(["lets-play"]);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}