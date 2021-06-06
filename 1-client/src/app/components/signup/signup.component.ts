import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

import { checkEmail } from '../../validators/checkEmail';
import { checkPassword } from '../../validators/checkPassword';
import { CheckPasswords } from '../../validators/checkPasswords';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isEmailExists: string;
  isUsernameExists: string;

  constructor(
    private checkPasswords: CheckPasswords,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl(null, [checkEmail]),
      password: new FormControl(null, checkPassword),
      confirmPassword: new FormControl(null, checkPassword)
    }, { validators: [this.checkPasswords.validate] });
  }

  onSignupFormSubmit(): void {
    this.authService.registerUser(this.signupForm.value).subscribe({
      next: (respone) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: respone.message });
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          if (error.error.message.includes('Email')) {
            this.isEmailExists = error.error.message;
          } else if (error.error.message.includes('Username')) {
            this.isUsernameExists = error.error.message;
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong! Please try later.'});
        }
      }
    });
  }
}
