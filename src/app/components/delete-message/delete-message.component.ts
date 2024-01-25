import {Component, Output, EventEmitter} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-delete-message',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-message.component.html',
  styleUrl: './delete-message.component.scss'
})
export class DeleteMessageComponent {
  @Output() deleteClickedYes = new EventEmitter<void>();
  @Output() deleteClickedNo = new EventEmitter<void>();


  constructor(public dialogRef: MatDialogRef<DeleteMessageComponent>) {}

  closeDialogNo(): void {
    this.deleteClickedNo.emit();
    this.dialogRef.close();
  }
  closeDialogYes(): void {
    this.deleteClickedYes.emit();
    this.dialogRef.close();
  }
}
