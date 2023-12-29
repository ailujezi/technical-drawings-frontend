import { Component } from '@angular/core';
//import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

import { AiModel } from '../../interfaces/ai_model';

import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import AiModelList from '../../../assets/exampleAiList.json';


@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
  project = { name: '', description: '', ai_model_id: null };

  aiModels: AiModel[] = AiModelList; 


  //constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // Lade die AI-Modelle vom Server
  }

  onSubmit(): void {
    // Sende die Daten an den Server
  }
}
