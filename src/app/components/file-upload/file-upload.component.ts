import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      // Behandeln Sie den Fall, wenn keine Datei ausgewählt ist
      this.selectedFile = null;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
  
      // Code zum Hochladen an den Server
    } else {
      // Behandeln Sie den Fall, wenn keine Datei ausgewählt wurde
      // Zum Beispiel: Benachrichtigen Sie den Benutzer, dass keine Datei ausgewählt wurde
    }
  }
}
