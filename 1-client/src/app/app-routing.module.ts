import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IfUserNotLoggedinGuard } from './guards/ifUserNotLoggedin.guard';
import { IsUserLoggedin } from './guards/ifUserLoggedin';

const routes: Routes = [
  { path: '', component: LoginComponent, resolve: [IsUserLoggedin] },
  { path: 'signup', component: SignupComponent, resolve: [IsUserLoggedin] },
  {
    path: 'dashboard',
    canLoad: [IfUserNotLoggedinGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
