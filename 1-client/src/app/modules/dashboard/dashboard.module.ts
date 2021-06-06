import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProjectsComponent } from './dashboard-home/homepage/projects/projects.component';
import { ProjectFormComponent } from './dashboard-home/homepage/project-form/project-form.component';
import { ProjectComponent } from './dashboard-home/project/project.component';
import { HomepageComponent } from './dashboard-home/homepage/homepage.component';
import { BugsComponent } from './dashboard-home/project/bugs/bugs.component';
import { AddUserFormComponent } from './dashboard-home/project/add-user-form/add-user-form.component';
import { ProfileComponent } from './dashboard-home/profile/profile.component';
import { BugFormComponent } from './dashboard-home/project/bug-form/bug-form.component';
import { HeaderComponent } from './dashboard-home/project/header/header.component';
import { BugComponent } from './dashboard-home/project/bug/bug.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectComponent,
    HomepageComponent,
    BugsComponent,
    AddUserFormComponent,
    ProfileComponent,
    BugFormComponent,
    HeaderComponent,
    BugComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ],
  providers: [DialogService]
})
export class DashboardModule { }
