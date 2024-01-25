import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon'; 
import {MatCardModule} from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list'; 

import { CreateProjectComponent } from '../create-project/create-project.component';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatListModule, CreateProjectComponent, MatIconModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit{

  constructor(public dialog: MatDialog, private projectService: ProjectService) {}

  projects: Project[] = []; 
  

  @Output() projectSelected = new EventEmitter<Project>();

  //If selected project changes emit to parent (mainview)
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
        return of(null);
      })
    ).subscribe();

  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '300px',
      data: {}
  });


  //Handle cloing of dialog
  dialogRef.afterClosed().subscribe(result => {
    this.projectService.getProjects().pipe(
      tap(response => {
        this.projects = response;
      }),
      catchError(error => {
        console.error("Could not get projects", error);
        return of(null);
      })
    ).subscribe();
    
    console.log('Der Dialog wurde geschlossen');
    });
  }

  openDialog(project: Project): void {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      width: '250px',
    });

    dialogRef.componentInstance.deleteClickedNo.subscribe(() => {
    });

    dialogRef.componentInstance.deleteClickedYes.subscribe(() => {
      this.deleteProject(project);
    });
  }

  deleteProject(project: Project): void {
    this.projectService.deleteProject(project.id).subscribe(
      response => {
        this.projectService.getProjects().pipe(
          tap(response => {
            this.projects = response;
          }),
          catchError(error => {
            console.error("Could not get projects", error);
            return of(null);
          })
        ).subscribe();
      },
      error => console.error(error + "delete project")
    );
  }
}
