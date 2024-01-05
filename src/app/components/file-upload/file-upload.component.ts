import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFiles: File[] = [];

  constructor(private snackBar: MatSnackBar) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = Array.from(inputElement.files);
    } else {
      this.selectedFiles = [];
    }
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        const formData = new FormData();
        formData.append('file', file, file.name);

        // upload the file to the server
        // FileUploadService

        this.snackBar.open(`Uploading ${file.name}`, 'Close', {
          duration: 2000,
        });
      });
    } else {
      this.snackBar.open('No files selected', 'Close', { duration: 2000 });
    }
  }
}