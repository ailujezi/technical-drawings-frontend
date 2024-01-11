import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { Image } from '../interfaces/image';
import { AiModel } from '../interfaces/ai_model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    const url = 'http://localhost:8080/store/projects';
    return this.http.get<Project[]>(url);
  }

  createProject(data: any) {
    const url = 'http://localhost:8080/store/projects';
    return this.http.post(url, data);
  }


  getImages(projectId: number): Observable<Image[]> {
    const url = 'http://localhost:8080/store/projects';
    return this.http.get<Image[]>(`${url}/${projectId}/images`);
  }

  uploadImage(projectId: number, formData: FormData) {
    const url = 'http://localhost:8080/store/projects';
    return this.http.post(`${url}/${projectId}/images`, formData);
  }

  getAIModels(): Observable<AiModel[]> {
    const url = 'http://localhost:8080/store/ais';
    return this.http.get<AiModel[]>(url);
  }

  deleteImg(projectId: number, imageId: number) {
    const url = 'http://localhost:8080/store/projects'
    return this.http.delete(`${url}/${projectId}/images/${imageId}`);
  }

}