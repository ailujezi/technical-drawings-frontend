import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../interfaces/project';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { ProjectDetailComponent } from '../../components/project-detail/project-detail.component';
import { HeaderComponent } from '../../components/header/header.component'
import { MainContentComponent } from '../main-content/main-content.component';

import {MatGridListModule} from '@angular/material/grid-list'; 

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ProjectListComponent, ProjectDetailComponent, MatGridListModule, HeaderComponent, MainContentComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  title = 'technical-drawings-frontend';

  selectedProject?: Project;
  isMenuOpenValue?: boolean = true;

  onProjectSelected(project: Project): void {
    this.selectedProject = project;
  }

  onMenuOpenChanged(isMenuOpen: boolean): void {
    this.isMenuOpenValue = isMenuOpen;
  }
}
