import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../../../../../services/auth.service';
import { BugService } from '../../../../../services/bug.service';
import { BugFormComponent } from '../bug-form/bug-form.component';
import { BugComponent } from '../bug/bug.component';

import { Bug } from '../../../../../models/Bug';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit, OnDestroy {
  subRole: Subscription;
  role: string;
  userId: number;
  projectId: string;
  modalOptions = {
    showHeader: false,
    width: '70%',
    closeOnEscape: false,
  };

  @Input() bugs: Bug[];
  @Input() users: string[];
  @Output() updateBugs = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private bugService: BugService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subRole = this.authService.role$.subscribe(role => this.role = role);
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.userId = +localStorage.getItem('userId');
  }

  showEditBugModal(bugId: string): void {
    const ref = this.dialogService.open(BugFormComponent, {
      data: {
        mode: 'edit',
        users: this.users,
        projectId: this.projectId,
        bugId
      },
      ...this.modalOptions
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.bugService.updateBug(data, bugId).subscribe({
          next: (respone) => {
            this.updateBugs.emit();
            this.messageService.add({ severity: 'info', detail: respone.message });
          },
          error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
        });
      },
      error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
    });
  }

  showDeleteBugModal(bugId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this bug?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bugService.deleteBug(bugId).subscribe({
          next: (respone) => {
            this.updateBugs.emit();
            this.messageService.add({ severity: 'info', detail: respone.message });
          },
          error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
        });
      }
    });
  }

  showAboutBug(bugId: string): void {
    this.dialogService.open(BugComponent, {
      data: {
        users: this.users,
        projectId: this.projectId,
        bugId,
      },
      ...this.modalOptions
    });
  }

  ngOnDestroy(): void { this.subRole.unsubscribe(); }
}
