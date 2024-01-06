import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list'; 

import { CreateProjectComponent } from '../create-project/create-project.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatListModule, CreateProjectComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit{

  constructor(public dialog: MatDialog, private projectService: ProjectService) {}

  projects: Project[] = []; 
  

  @Output() projectSelected = new EventEmitter<Project>();

  selectProject(project: Project): void {
    this.projectSelected.emit(project);
  }

  ngOnInit(): void {
    this.projectService.getProjects().pipe(
      tap(response => {
        this.projects = response;
      }),
      catchError(error => {
        console.error("Could not get projects", error);
        return of(null); // Return an observable to complete the pipe
      })
    ).subscribe();

  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '300px',
      data: { /* daten übergeben*/ }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.projectService.getProjects().pipe(
      tap(response => {
        this.projects = response;
      }),
      catchError(error => {
        console.error("Could not get projects", error);
        return of(null); // Return an observable to complete the pipe
      })
    ).subscribe();
    console.log('Der Dialog wurde geschlossen');
    //etwas tun wenn der Dialog geschlossen wird
  });
}
}
