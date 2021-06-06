import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    const modifiedReq = req.clone({
      withCredentials: true,
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${userToken}`
    })

    });

    return next.handle(modifiedReq);
  }
}
