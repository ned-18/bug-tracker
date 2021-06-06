import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<any> {
    return this.http.get<any>(`${environment.rootURL}/user`).pipe(map(respone => {
      return {
        firstName: respone.data.firstName,
        lastName: respone.data.lastName,
        username: respone.data.username,
        email: respone.data.email,
        password: null,
        confirmPassword: null
      };
    }));
  }

  updateUsersProfile(user: any): Observable<any> {
    return this.http.patch<any>(`${environment.rootURL}/user`, user);
  }
}
