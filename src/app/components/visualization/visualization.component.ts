import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project';
import { Image } from '../../interfaces/image';
import { OverlayRecognition } from '../../interfaces/overlay_recognition';
import { ProjectService } from '../../services/project.service';
import { ResultsService } from '../../services/results.service';

import {MatIconModule} from '@angular/material/icon'; 
import { SecurePipe } from '../../pipes/secure.pipe';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'



@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [ CommonModule, MatIconModule, SecurePipe],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss'
})
export class VisualizationComponent {
  @Input() selectedProject?: Project;

  constructor(private projectService: ProjectService, private resultsService: ResultsService) { }

  isVisualized: boolean = false;
  images: Image[] = [];
  overlays: OverlayRecognition[] = [];

  ngOnInit() {
    this.loadImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedProject && this.selectedProject.status == 'COMPLETED') {
      this.isVisualized = true;
    }
    else {
      this.isVisualized = false;
    }
    if (changes['selectedProject']) {
      const change = changes['selectedProject'];
      if (change && !change.firstChange) {
        const newProject = change.currentValue as Project;
        this.images = [];
        this.loadImages();
      }
    }
  }

  loadImages(): void {
    if (this.selectedProject && this.selectedProject.id !== undefined) {
      if (this.selectedProject.status == 'COMPLETED') {
        this.isVisualized = true;
        this.getOverlays();
      }
      else {
        this.isVisualized = false;
      }
      this.projectService.getImages(this.selectedProject.id).subscribe(
        data => this.images = data,
        error => console.error(error)
      );
    } else {
      console.error('Selected project is undefined (loadImages)');
    }
  }

  getOverlays() {
    if (this.selectedProject) {
      this.resultsService.getOverlays(this.selectedProject.id).pipe(
          tap(response => {
            if (response) {
              const responseData = response[0];
              const keys = Object.keys(responseData.result_recognition);
              
              if (keys.length > 0) {
                const firstKey = keys[0];
                console.log(firstKey);

                this.overlays = responseData.result_recognition[firstKey].elements;
              }
            }       
          }),
          catchError(error => {
              console.error("Could not get Overlays", error);
              return of(null);
          })
      ).subscribe();
    }
  }

  getOverlayStyle(imageElement: HTMLImageElement, overlay: any) {
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;
  
    const { scaleFactorWidth, scaleFactorHeight } = this.getScaleFactor(imageElement, originalWidth, originalHeight);
  
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
      'background-color': 'red',
      'border': '5px solid blue',
      'z-index': '10'
    };
  }

  getScaleFactor(imageElement: HTMLImageElement, originalWidth: number, originalHeight: number) {
    const scaleFactorWidth = imageElement.width / originalWidth;
    const scaleFactorHeight = imageElement.height / originalHeight;
    return { scaleFactorWidth, scaleFactorHeight };
  }
}
