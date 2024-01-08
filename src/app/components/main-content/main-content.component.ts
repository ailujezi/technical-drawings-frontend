import { Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MatTabsModule, ProjectDetailComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  @Input() selectedProject?: Project;


}
