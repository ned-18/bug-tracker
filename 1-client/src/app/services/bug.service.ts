import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { CreateBugRespone, GetBugsRespone, GetBugRespone, UpdateBugRespone, DeleteBugRespone } from '../models/Bug';

interface BugForm {
  name: string;
  assignTo: string[];
  priority: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }

  createBug(bug: BugForm, projectId: string): Observable<CreateBugRespone> {
    return this.http.post<CreateBugRespone>(`${environment.rootURL}/bug?project=${projectId}`, bug);
  }

  getAllBugs(projectId: string): Observable<GetBugsRespone> {
    return this.http.get<GetBugsRespone>(`${environment.rootURL}/bugs?project=${projectId}`);
  }

  getBug(bugId: string, projectId: string): Observable<GetBugRespone> {
    return this.http.get<GetBugRespone>(`${environment.rootURL}/bug/${bugId}?project=${projectId}`);
  }

  updateBug(bug: BugForm, bugId: string): Observable<UpdateBugRespone> {
    return this.http.patch<UpdateBugRespone>(`${environment.rootURL}/bug/${bugId}`, bug);
  }

  deleteBug(bugId: string): Observable<DeleteBugRespone> {
    return this.http.delete<DeleteBugRespone>(`${environment.rootURL}/bug/${bugId}`);
  }
}
