import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../interfaces/project';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { ProjectDetailComponent } from '../../components/project-detail/project-detail.component';
import { HeaderComponent } from '../../components/header/header.component'

import {MatGridListModule} from '@angular/material/grid-list'; 

@Component({
  selector: 'app-main-window',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ProjectListComponent, ProjectDetailComponent, MatGridListModule, HeaderComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.scss'
})
export class MainWindowComponent {
  title = 'technical-drawings-frontend';

  selectedProject?: Project;

  onProjectSelected(project: Project): void {
    this.selectedProject = project;
  }
}
