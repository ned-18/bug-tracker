import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProjectService } from '../../../../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  mode: string;
  categories: string[];
  header: string;
  buttonLabel: string;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private projectSerivce: ProjectService
  ) { }

  ngOnInit(): void {
    this.categories = [ 'Web Application', 'Mobile Application', 'Others' ];
    this.mode = this.config.data.mode;

    this.projectForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      category: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      status: new FormControl(null),
    });

    if (this.config.data.mode === 'create') {
      this.header = 'Create New Project';
      this.buttonLabel = 'Create';
    } else {
      this.header = 'Edit Project';
      this.buttonLabel = 'Edit';
      this.getProjectData();
    }
  }

  onSubmit(): void { this.ref.close(this.projectForm.value); }

  closeDialog(): void { this.ref.destroy(); }

  private getProjectData(): void {
    this.projectSerivce.getOneProject(this.config.data.projectId).subscribe({
      next: (respone) => {
        const data = {
          name: respone.name,
          category: respone.category,
          description: respone.description,
          status: respone.status
        };
        this.projectForm.setValue(data);
      },
      error: () => this.messageService.add({severity: 'error', detail: 'Something went wrong! Please try later.'})
    });
  };
}
