import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { Image } from '../interfaces/image';
import { AiModel } from '../interfaces/ai_model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) {}

  startVisualization(projectId: number) {
    const url = 'http://localhost:8080/store/projects';
    return this.http.post(`${url}/${projectId}/start`, null);
  }
}
