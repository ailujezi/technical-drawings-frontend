import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from '../../interfaces/project';
//import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


import projectList from '../../../assets/exampleProject.json';
import { CreateProjectComponent } from '../create-project/create-project.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDialogModule, CreateProjectComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit{

  //constructor(private projectService: ProjectService) {}

  constructor(public dialog: MatDialog) {}


  projects: Project[] = projectList; 

  project: Project = projectList[0];

  

  @Output() projectSelected = new EventEmitter<Project>();

  selectProject(project: Project): void {
    this.projectSelected.emit(project);
  }

  ngOnInit(): void {
    /*this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });*/
    console.log(this.project);

  }

  openCreateProjectDialog(): void {
    console.log("huhu");
  const dialogRef = this.dialog.open(CreateProjectComponent, {
    width: '300px',
    data: { /* daten übergeben*/ }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Der Dialog wurde geschlossen');
    //etwas tun wenn der Dialog geschlossen wird
  });
}
}
