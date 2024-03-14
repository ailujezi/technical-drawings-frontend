import {  Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'

import {MatIconModule} from '@angular/material/icon'; 
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



import { SelectedProjectService } from '../../services/selected-project.service';
import { SecurePipe } from '../../pipes/secure.pipe';
import { Image } from '../../interfaces/image';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { EditImageNotesComponent } from '../edit-image-notes/edit-image-notes.component';
import { EditImageNameComponent } from '../edit-image-name/edit-image-name.component';
import { InformationExchangeService } from '../../services/information-exchange.service';


@Component({
  selector: 'app-image-details',
  standalone: true,
  imports: [CommonModule, SecurePipe, MatIconModule, MatButtonModule],
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.scss'
})
export class ImageDetailsComponent implements OnInit, OnDestroy  {

  private loadImagesSubscription: Subscription;


  constructor( private dialog: MatDialog, private selectedProjectService: SelectedProjectService, private informationExchangeService: InformationExchangeService, private projectService: ProjectService) {
    this.loadImagesSubscription = this.informationExchangeService.executeFunction.subscribe(() => {
      this.images = [];
      this.loadImages();
    }); 
   }

  imageDetails = {name: "", notes: ""}
  images: Image[] = [];
  selectedProject?: Project;
  selectedImage?: Image;

  private selectedProjectSubscription = new Subscription();


  ngOnInit(): void {
    this.selectedProjectSubscription = this.selectedProjectService.getSelectedProject().subscribe(project => {
      this.selectedProject = project;
      this.loadImages();
      this.selectedImage = undefined;
    });
  }

  ngOnDestroy(): void {
      
  }

  loadImages() {
    if (this.selectedProject && this.selectedProject.id !== undefined) {
      this.projectService.getImages(this.selectedProject.id).pipe(
        tap(data => {
          this.images = data;
          console.log('Daten erfolgreich geladen (visualization)');
        }),
        catchError(error => {
          // Fehlerbehandlung
          console.error(error);
          return of([]);
        })
      ).subscribe();

    } else {
      console.error('Selected project is undefined (canvas)');
    }
    this.selectedImage = undefined;
  }

  selectImage(image: Image) {
    this.selectedImage = image;
  }

  editNotes(image: Image) {
    const dialogRef = this.dialog.open(EditImageNotesComponent, {
      width: '300px',
      data: {
        image: image,
      }
    }); 

    dialogRef.afterClosed().subscribe(result => {
      console.log('Das Dialogfenster wurde geschlossen');
    });
  }

  editName(image: Image) {
    const dialogRef = this.dialog.open(EditImageNameComponent, {
      width: '300px',
      data: {
        image: image,
      }
    }); 

    dialogRef.afterClosed().subscribe(result => {
      console.log('Das Dialogfenster wurde geschlossen');

    });
  }
}
