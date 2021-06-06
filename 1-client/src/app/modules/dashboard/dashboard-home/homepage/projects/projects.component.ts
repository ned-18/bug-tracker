import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectService } from '../../../../../services/project.service';
import { AuthService } from '../../../../../services/auth.service';

import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from '../../../../../models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  role: string;
  @Input() projects: Project[] = [];
  @Output() updateProjects = new EventEmitter<any>();

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { this.sub = this.authService.role$.subscribe(role => this.role = role ); }

  showEditModal(projectId: string): void {
    const ref = this.dialogService.open(ProjectFormComponent, {
      data: {
        projectId,
        mode: 'edit'
      },
      showHeader: false,
      width: '70%',
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.projectService.updateProject(data, projectId).subscribe({
          next: (respone) => {
            this.updateProjects.emit();
            this.messageService.add({ severity: 'info', detail: respone.message });
          },
          error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
        });
      },
      error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
    });
  }

  showDeleteModal(projectId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this project?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteProject(projectId).subscribe({
          next: (respone) => {
            this.updateProjects.emit();
            this.messageService.add({ severity: 'info', detail: respone.message });
          },
          error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
        });
      }
    });
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
