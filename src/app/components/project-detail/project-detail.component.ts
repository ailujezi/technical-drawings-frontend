import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { FileUploadComponent } from '../file-upload/file-upload.component';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ CommonModule, FileUploadComponent ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  @Input() selectedProject?: Project;
}
