import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { BugService } from '../../../../../services/bug.service';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  bugForm: FormGroup;
  priority: string[];
  users: string[];
  mode: string;
  header: string;
  buttonLabel: string;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    private bugService: BugService,
  ) { }

  ngOnInit(): void {
    this.priority = ['Weak', 'Medium', 'High'];
    this.users = this.config.data.users;
    this.mode = this.config.data.mode;

    this.bugForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      assignTo: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      status: new FormControl(null)
    });

    if (this.config.data.mode === 'create') {
      this.header = 'Add new bug';
      this.buttonLabel = 'Add bug';
    } else {
      this.header = 'Edit bug';
      this.buttonLabel = 'Edit';
      this.getBugData();
    }
  }

  onSubmit(): void { this.ref.close(this.bugForm.value); }

  closeDialog(): void { this.ref.destroy(); }

  private getBugData(): void {
    this.bugService.getBug(this.config.data.bugId, this.config.data.projectId).subscribe({
      next: (respone) => {
        const data = {
          name: respone.data.name,
          assignTo: respone.data.assignTo,
          priority: respone.data.priority,
          description: respone.data.description,
          status: respone.data.status
        };
        this.bugForm.setValue(data);
      },
      error: () => this.messageService.add({ severity: 'error', detail: 'Something went wrong! Please try later.' })
    });
  }

}
