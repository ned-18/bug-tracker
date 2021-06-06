import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import {
  CreateProjectRespone,
  ProjectsRespone,
  ProjectRespone,
  UpdateProjectRespone,
  DeleteProjectRespone,
  AddNewUserToProjectRespone,
  ProjectWithUsers as Project
} from '../models/Project';

interface  ProjectForm {
    id: number;
    name: string;
    category: string;
    description: string;
    status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  createProject(project: ProjectForm): Observable<CreateProjectRespone> {
    return this.http.post<CreateProjectRespone>(`${environment.rootURL}/project`, project);
  }

  getAllProject(): Observable<ProjectsRespone> {
    return this.http.get<ProjectsRespone>(`${environment.rootURL}/projects`);
  }

  getOneProject(projectId: string): Observable<Project> {
    return this.http.get<ProjectRespone>(`${environment.rootURL}/project/${projectId}`).pipe(map(respone => {
      const users = [];
      respone.data.project.users.forEach(user => {
        users.push(user.username);
      });

      const data = {
        id: respone.data.project.id,
        name: respone.data.project.name,
        category: respone.data.project.category,
        description: respone.data.project.description,
        status: respone.data.project.status,
        createdAt: respone.data.project.createdAt,
        updatedAt: respone.data.project.updatedAt,
        users
      };

      return data;
    }));
  }

  updateProject(project: ProjectForm, projectId: string): Observable<UpdateProjectRespone> {
    return this.http.patch<UpdateProjectRespone>(`${environment.rootURL}/project/${projectId}`, project);
  }

  deleteProject(projectId: string): Observable<DeleteProjectRespone> {
    return this.http.delete<DeleteProjectRespone>(`${environment.rootURL}/project/${projectId}`);
  }

  addNewUserToProject(emails: { emailFrom: string; emailTo: string; }, projectId: string): Observable<AddNewUserToProjectRespone> {
    return this.http.post<AddNewUserToProjectRespone>(`${environment.rootURL}/add-user/${projectId}`, emails);
  }
}
