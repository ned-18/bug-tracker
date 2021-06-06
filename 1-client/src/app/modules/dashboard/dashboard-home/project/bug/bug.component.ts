import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BugService } from '../../../../../services/bug.service';

import { Bug } from '../../../../../models/Bug';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {
  bug: Bug;
  users: string[];

  constructor(
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private bugService: BugService,
  ) { }

  ngOnInit(): void {
    this.getBugData();
    this.users = this.config.data.users;
  }

  closeDialog(): void { this.ref.destroy(); }

  private getBugData(): void {
    this.bugService.getBug(this.config.data.bugId, this.config.data.projectId).subscribe({
      next: (respone) => this.bug = respone.data,
      error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
    });
  }


}
