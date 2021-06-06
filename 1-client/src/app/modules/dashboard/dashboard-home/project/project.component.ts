import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../../../services/project.service';
import { BugService } from '../../../../services/bug.service';
import { BugFormComponent } from './bug-form/bug-form.component';

import { Project } from '../../../../models/Project';
import { Bug } from '../../../../models/Bug';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  subParam: Subscription;
  users: string[] = [];
  project: Project;
  bugs: Bug[];
  userId: number;
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private bugService: BugService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.subParam = this.route.params.subscribe(param => {
      this.getAllBugs(param.id);
      this.getProject(param.id);
    });
  }

  updateBugs(): void { this.getAllBugs(String(this.project.id)); }

  showCreateBugModal(): void {
    const ref = this.dialogService.open(BugFormComponent, {
      data: { users: this.users, mode: 'create' },
      showHeader: false,
      width: '70%',
      closeOnEscape: false,
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.bugService.createBug(data, String(this.project.id)).subscribe({
          next: (respone) => {
            this.messageService.add({ severity: 'success', detail: respone.message });
            this.getAllBugs(String(this.project.id));
          },
          error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
        });
      },
      error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
    });
  }

  private getAllBugs(projectId: string): void {
    this.isLoading = true;
    this.bugService.getAllBugs(projectId).subscribe({
      next: (respone) => { this.bugs = respone.data; this.isLoading = false; },
      error: () => {
        this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' });
        this.isLoading = false;
      }
    });
  }

  private getProject(projectId: string): void {
    this.projectService.getOneProject(projectId).subscribe({
      next: (respone) => { this.project = respone; this.users = respone.users; },
      error: () => this.messageService.add({severity: 'success', detail: 'Something went wrong! Please try later.'})
    });
  }

  ngOnDestroy(): void { this.subParam.unsubscribe(); }

}
