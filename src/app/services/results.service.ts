import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from '../interfaces/results';
import { Project } from '../interfaces/project';
import { Image } from '../interfaces/image';
import { AiModel } from '../interfaces/ai_model';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) {
  }

  startVisualization(projectId: number) {
    const url = 'store/projects';
    return this.http.post(`${url}/${projectId}/start`, null);
  }

  getOverlays(projectId: number): Observable<Results> {
    const url = 'store/projects';
    return this.http.get<Results>(`${url}/${projectId}/results`);
  }
}
