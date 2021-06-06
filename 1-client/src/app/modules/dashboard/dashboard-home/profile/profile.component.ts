import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../services/user.service';

import { checkEmail } from '../../../../validators/checkEmail';
import { checkPassword } from '../../../../validators/checkPassword';
import { CheckPasswords } from '../../../../validators/checkPasswords';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  username: string;
  isUsernameExists: string;
  isEmailExists: string;

  constructor(
    private router: Router,
    private checkPasswords: CheckPasswords,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl(null, [checkEmail]),
      password: new FormControl(null, checkPassword),
      confirmPassword: new FormControl(null, checkPassword)
    }, { validators: [this.checkPasswords.validate] });

    this.getUsersData();
  }


  onSubmit(): void {
    this.userService.updateUsersProfile(this.profileForm.value).subscribe({
      next: (respone) => {
        this.messageService.add({ severity: 'info', detail: respone.message });
        this.router.navigate(['/dashboard/home']);
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

  private getUsersData(): void {
    this.userService.getUsersData().subscribe({
      next: (respone) => { this.profileForm.setValue(respone); this.username = respone.username; },
      error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later!' })
    });
  }

}

