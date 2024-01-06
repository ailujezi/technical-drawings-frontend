import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { Image } from '../../interfaces/image';
import { ProjectService } from '../../services/project.service';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import { SecurePipe } from '../../pipes/secure.pipe';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatIconModule, FormsModule, SecurePipe ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnChanges{
  @Input() selectedProject?: Project;

  constructor(private projectService: ProjectService) { }

  images: Image[] = [];

  ngOnInit() {
    this.loadImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProject']) {
      const change = changes['selectedProject'];
      if (change && !change.firstChange) {
        const newProject = change.currentValue as Project;
        this.images = [];
        this.loadImages();
      }
    }
  }

  scrollLeft(): void {
    const gallery = document.querySelector('.gallery');
    if (gallery)
      gallery.scrollBy({ left: -gallery.clientWidth / 5, behavior: 'smooth' });
  }

  scrollRight(): void {
    const gallery = document.querySelector('.gallery');
    if (gallery)
      gallery.scrollBy({ left: gallery.clientWidth / 5, behavior: 'smooth' });
  }
  selectedFiles: File[] = [];

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  loadImages(): void {
    if (this.selectedProject && this.selectedProject.id !== undefined) {
      this.projectService.getImages(this.selectedProject.id).subscribe(
        data => this.images = data,
        error => console.error(error)
      );
    } else {
      console.error('Selected project is undefined (loadImages)');
    }
  }

  
  uploadImage(): void {
    this.selectedFiles.forEach(file => {
      const formData = new FormData();
      formData.append('file', file, file.name);

      if (this.selectedProject && this.selectedProject.id !== undefined) {
        this.projectService.uploadImage(this.selectedProject?.id, formData).subscribe(
          response => {
            console.log('Image uploaded successfully!');
            this.loadImages();
          },
          error => console.error(error)
        );
      }else {
        console.error('Selected project is undefined (uploadImage)');
      }
    });
  }
}
