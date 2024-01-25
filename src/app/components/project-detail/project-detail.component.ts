import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { Image } from '../../interfaces/image';
import { ProjectService } from '../../services/project.service';
import { ResultsService } from '../../services/results.service';
import { FormsModule } from '@angular/forms';
import { AiModel } from '../../interfaces/ai_model';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import { SecurePipe } from '../../pipes/secure.pipe';

import {MatGridListModule} from '@angular/material/grid-list'; 
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'

import { interval } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatIconModule, FormsModule, SecurePipe, MatGridListModule ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnChanges{
  //Get selectedproject from Parent(mainview)
  @Input() selectedProject?: Project;

  constructor(private projectService: ProjectService, private resultService: ResultsService, public dialog: MatDialog) { }

  images: Image[] = [];
  aiModelName: string = "";
  aiModels: AiModel[] = []; 


  ngOnInit() {
    //Get AIModels on init
    this.loadImages();
    this.projectService.getAIModels().pipe(
      tap(response => {
        this.aiModels = response;
      }),
      catchError(error => {
        console.error("Could not get AIModels", error);
        return of(null); // Return an observable to complete the pipe
      })
    ).subscribe();
  }

  //When selctedproject changes then load new images and set AIModel name
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProject']) {
      const change = changes['selectedProject'];
      if (change && !change.firstChange) {
        const newProject = change.currentValue as Project;
        this.images = [];
        this.loadImages();
        for (let i = 0; i < this.aiModels.length; i++) {
          if (this.selectedProject?.ai_model_id == this.aiModels[i].id) {
            this.aiModelName = this.aiModels[i].name;
          }
        }
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

  deleteImg(image: Image): void {
    if (this.selectedProject) {

      this.projectService.deleteImg(image.project_id, image.id).subscribe(
        response => {
          this.loadImages();
        },
        error => console.error(error + "delete image")
      );
    }
  }

  openDialog(image: Image): void {
    const dialogRef = this.dialog.open(DeleteMessageComponent, {
      width: '250px',
    });

    dialogRef.componentInstance.deleteClickedNo.subscribe(() => {
    });

    dialogRef.componentInstance.deleteClickedYes.subscribe(() => {
      this.deleteImg(image);
    });
  }

  startVisualization() {
    if (this.selectedProject) {
      const currentProjectId = this.selectedProject.id;
      this.resultService.startVisualization(this.selectedProject.id).pipe(
          tap(response => {
              const pollingInterval = 1000;
              interval(pollingInterval).pipe(
                  switchMap(() => this.projectService.getProject(currentProjectId)),
                  takeWhile(project => this.checkCondition(project), true)
              ).subscribe(project => {
                  if (!this.checkCondition(project)) {
                      console.log('Visualization Completed');
                  }
                  else {
                  }
              });
          }),
          catchError(error => {
              console.error("Could not start visualization", error);
              return of(null);
          })
      ).subscribe();
    }
}

checkCondition(project: Project): boolean {
    if (project.status == 'COMPLETED') {
      return false;
    }
    return true;
}
}
