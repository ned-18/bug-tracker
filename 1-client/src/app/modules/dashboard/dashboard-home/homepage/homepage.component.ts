import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../../../services/project.service';
import { AuthService } from '../../../../services/auth.service';

import { ProjectFormComponent } from './project-form/project-form.component';
import { Project } from '../../../../models/Project';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  projects: Project[] = [];
  role: string;
  isLoading = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
    this.sub = this.authService.role$.subscribe(role =>  this.role = role );
  }

  updateProjects(): void { this.getAllProjects(); }

  showCreateModal(): void {
    const ref = this.dialogService.open(ProjectFormComponent, {
      data: {
        mode: 'create'
      },
      showHeader: false,
      width: '70%',
      closeOnEscape: false,
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.projectService.createProject(data).subscribe({
          next: (respone) => {
            this.messageService.add({severity: 'success', detail: respone.message});
            this.getAllProjects();
          },
          error: () => this.messageService.add({severity: 'error', detail: 'Something went wrong! Please try later.'})
        });
      },
      error: () => this.messageService.add({severity: 'error', detail: 'Something went wrong! Please try later.'})
    });
  }

  // Get All Projects for the logged-in user
  private getAllProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProject().subscribe({
      next: (respone) => {
        this.projects = respone.data;
        this.isLoading = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', detail: 'Something went wrong! Please try later.'});
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
