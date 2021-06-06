import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class IsUserLoggedin {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  resolve(): Observable<boolean> {
    return this.authService.signedIn$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap((authenticated) => {
        if (authenticated) {
          this.router.navigateByUrl('/dashboard/home');
        }
      })
    );
  }
}
