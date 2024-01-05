import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';

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
}