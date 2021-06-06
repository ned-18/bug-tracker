import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { HomepageComponent } from './dashboard-home/homepage/homepage.component';
import { ProjectComponent } from './dashboard-home/project/project.component';
import { ProfileComponent } from './dashboard-home/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: DashboardHomeComponent, children: [
      { path: 'home', component: HomepageComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'profile', component: ProfileComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
