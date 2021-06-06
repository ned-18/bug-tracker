import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLoginFormSubmit(): void {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (respone) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: respone.message });
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
            this.messageService.add({ severity: 'info', summary: 'Try again!', detail: 'Your credentials are not valid!' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong! Please try later.'});
        }
      }
    });
  }
}
