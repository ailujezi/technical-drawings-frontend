import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { Image } from '../../interfaces/image';
import { ProjectService } from '../../services/project.service';

import {MatIconModule} from '@angular/material/icon'; 
import { SecurePipe } from '../../pipes/secure.pipe';



@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [ CommonModule, MatIconModule, SecurePipe],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss'
})
export class VisualizationComponent {
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
}
