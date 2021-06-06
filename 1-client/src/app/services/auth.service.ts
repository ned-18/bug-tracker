import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { environment } from '../../environments/environment';
import { RegisterUser, RegisterRespone, LoginUser, LoginRespone, CheckAuth } from '../models/Auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  signedIn$ = new BehaviorSubject<boolean>(null);
  role$ = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router

  ) { }

  // USER AUTH
  // Register user
  registerUser(user: RegisterUser): Observable<RegisterRespone> {
    return this.http.post<RegisterRespone>(`${environment.rootURL}/auth/signup`, user);
  }

  // Login user
  loginUser(user: LoginUser): Observable<LoginRespone> {
    return this.http.post<LoginRespone>(`${environment.rootURL}/auth/login`, user).pipe(tap(respone => {
      localStorage.setItem('token', `Bearer ${respone.user.token}`);
      localStorage.setItem('role', respone.user.role);
      localStorage.setItem('userId', String(respone.user.id));
      this.signedIn$.next(true);
      this.role$.next(respone.user.role);
    }));
  }

  // Logout user
  logout(): void {
    this.signedIn$.next(false);
    this.role$.next(null);
    localStorage.clear();
    this.router.navigate(['/']);
    this.messageService.add({ severity: 'info', summary: 'Goodbye!', detail: 'You are logged out!' });
  }

  // Check if is user
  checkAuth(): Observable<CheckAuth> {
    return this.http.get<CheckAuth>(
      `${environment.rootURL}/auth/check-auth`
    ).pipe(tap(({ authenticated, user }) => {
      this.signedIn$.next(authenticated);
      this.role$.next(user?.role.name);
    }));
  }
}
