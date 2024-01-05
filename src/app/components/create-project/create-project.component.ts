import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

import { AiModel } from '../../interfaces/ai_model';

import { FormsModule } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip'; 

import AiModelList from '../../../assets/exampleAiList.json';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'


@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatSelectModule, MatTooltipModule, FormsModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
  project = { name: '', description: '', ai_model_id: null };

  aiModels: AiModel[] = AiModelList; 

  constructor(private projectService: ProjectService, public dialogRef: MatDialogRef<CreateProjectComponent>) {}

  ngOnInit(): void {
    // Lade die AI-Modelle vom Server
  }

  onSubmit(): void {
    this.projectService.createProject(this.project).pipe(
      tap(response => {
      }),
      catchError(error => {
        console.error("Project could not be created", error);
        return of(null); // Return an observable to complete the pipe
      })
    ).subscribe();
    
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
