import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { Image } from '../../interfaces/image';
import { Results } from '../../interfaces/results';
import { OverlayRecognition } from '../../interfaces/overlay_recognition';
import { ProjectService } from '../../services/project.service';
import { ResultsService } from '../../services/results.service';
import { InformationExchangeService } from '../../services/information-exchange.service';
import { Subscription } from 'rxjs';
import { SelectedProjectService } from '../../services/selected-project.service';

import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import { SecurePipe } from '../../pipes/secure.pipe';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'



@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [ CommonModule, MatIconModule, SecurePipe, MatListModule],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss'
})
export class VisualizationComponent implements OnInit, OnDestroy {
  selectedProject?: Project;
  private selectedProjectSubscription = new Subscription();

  private loadImagesSubscription: Subscription;

  constructor(private projectService: ProjectService, private resultsService: ResultsService, private informationExchangeService: InformationExchangeService, private selectedProjectService: SelectedProjectService) { 
    this.loadImagesSubscription = this.informationExchangeService.executeFunction.subscribe(() => {
      this.images = [];
      this.loadImages();
    });  
  }

  shouldShowImages: boolean = true;
  images: Image[] = [];
  overlays: OverlayRecognition[] = [];
  responseData?: Results[]; 

  selectedOverlay?: OverlayRecognition;

  selectedImage?: Image;

  selectImage(image: Image) {
    this.getOverlaysForCurrentImg(image);
    this.selectedImage = image;
  }

  selectOverlay(overlay: OverlayRecognition){
    this.selectedOverlay = overlay;
  }

  isSelected(overlay: OverlayRecognition) {
    if (this.selectedOverlay)
      return this.selectedOverlay === overlay;
    return false;
  }

  ngOnInit() {
    this.selectedProjectSubscription = this.selectedProjectService.getSelectedProject().subscribe(project => {
      this.selectedProject = project;
      this.loadImages();
      this.selectedImage = undefined;
      this.overlays = [];
    });

    this.loadImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProject']) {
      const change = changes['selectedProject'];
      if (change && !change.firstChange) {
        const newProject = change.currentValue as Project;
        this.selectedImage = undefined;
        this.images = [];
        this.overlays = [];
        this.loadImages();
      }
    }
  }

  ngOnDestroy() {
    this.selectedProjectSubscription.unsubscribe();
    this.loadImagesSubscription.unsubscribe();
  }

  //Gets images from server.
  loadImages(): void {
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

      this.getResults();

    } else {
      console.error('Selected project is undefined (loadImages)');
    }
    this.reloadGallery;
  }

  //Gets Overlays from server. 
  getResults() {
    if (this.selectedProject) {
      this.resultsService.getOverlays(this.selectedProject.id).pipe(
          tap(response => {
            if (response) {
              this.responseData = response;
            }       
          }),
          catchError(error => {
              console.error("Could not get Overlays", error);
              return of(null);
          })
      ).subscribe();
    }
  }

  getOverlaysForCurrentImg(image:Image) {
    if (this.responseData){
      let index = -1;
      for (let i = 0; i < this.responseData.length; i++) {
        if(image.id == this.responseData[i].image_id)
        {
          index = i;
        }
      }

      if (index == -1) {
        this.overlays = [];
        return;
      }
      //First Object in responsdata.results_recognition (interface Results, results_recognition) has unknown name and has to be handeld as key of a map.
      const keys = Object.keys(this.responseData[index].result_recognition);
                
      if (keys.length > 0) {
        const firstKey = keys[0];

        this.overlays = this.responseData[index].result_recognition[firstKey].elements;
      }
    }
  }

  //Styles for overlays have to be created dynamically
  getOverlayStyle(imageElement: HTMLImageElement, overlay: any) {
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;
  
    const { scaleFactorWidth, scaleFactorHeight } = this.getScaleFactor(imageElement, originalWidth, originalHeight);
  
    //Scale Overlays to current img size with scaleFactor
    const left = overlay.bbox_xyxy_abs[0] * scaleFactorWidth;
    const top = overlay.bbox_xyxy_abs[1] * scaleFactorHeight;
    const width = (overlay.bbox_xyxy_abs[2] - overlay.bbox_xyxy_abs[0]) * scaleFactorWidth;
    const height = (overlay.bbox_xyxy_abs[3] - overlay.bbox_xyxy_abs[1]) * scaleFactorHeight;
  
    return {
      'position': 'absolute',
      'left.px': left,
      'top.px': top,
      'width.px': width,
      'height.px': height,
      'border': '2px solid rgba(255, 102, 0, .5)',
      'z-index': '10',
    };
  }

  //Scalefactor for Overlays
  getScaleFactor(imageElement: HTMLImageElement, originalWidth: number, originalHeight: number) {
    const scaleFactorWidth = imageElement.width / originalWidth;
    const scaleFactorHeight = imageElement.height / originalHeight;
    return { scaleFactorWidth, scaleFactorHeight };
  }

  reloadLables() {
    var container = document.getElementById("overlays");
    if (container) {
      var content = container.innerHTML;
      container.innerHTML= content; 
    }
  }

  reloadGallery() {
    var container = document.getElementById("visualization-Gallery");
    if (container) {
      var content = container.innerHTML;
      container.innerHTML= content; 
    }
  }

  changeOverlay() {
    //Code um die Anderung des Overlays zu speichern
  }

  downloadImg() {
    //Code um die Visualisierte version des Bildes herunter zu laden
  }
}
