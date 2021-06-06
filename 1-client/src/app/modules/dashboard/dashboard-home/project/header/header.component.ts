import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../../services/auth.service';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';

import { Project } from '../../../../../models/Project';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subRole: Subscription;
  role: string;
  @Input() project: Project;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void { this.subRole = this.authService.role$.subscribe(role => this.role = role); }

  showUserModal(): void {
    this.dialogService.open(AddUserFormComponent, {
      data: { projectId: this.project.id },
      showHeader: false,
      width: '70%',
      closeOnEscape: false,
    });
  }

  ngOnDestroy(): void { this.subRole.unsubscribe(); }
}
