import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../../../../services/project.service';
import { checkEmail } from '../../../../../validators/checkEmail';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  addUserForm: FormGroup;
  isLoading = false;

  constructor(
    private ref: DynamicDialogRef,
    private projectService: ProjectService,
    private config: DynamicDialogConfig,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      emailFrom: new FormControl(null, [checkEmail]),
      emailTo: new FormControl(null, [checkEmail]),
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.projectService.addNewUserToProject(this.addUserForm.value, this.config.data.projectId).subscribe({
      next: (respone) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'info', detail: `${respone.message} User is added` });
        this.closeDialog();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.messageService.add({ severity: 'error', detail: error.message });
        } else {
          this.messageService.add({severity: 'error', detail: 'Something went wrong! Please try later.'});
        }
        this.isLoading = false;
      }
    });
  }

  closeDialog(): void { this.ref.destroy(); }

}
