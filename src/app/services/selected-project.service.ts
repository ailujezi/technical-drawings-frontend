import { Injectable, EventEmitter } from '@angular/core';
import { Project } from '../interfaces/project';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedProjectService {

  private selectedProject = new BehaviorSubject<Project | undefined>(undefined);

  getSelectedProject() {
    return this.selectedProject.asObservable();
  }

  setSelectedProject(project: Project) {
    this.selectedProject.next(project);
  }
}
