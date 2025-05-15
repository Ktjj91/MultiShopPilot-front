import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {authGuard} from './guards/auth/auth.guard';
import {loggedOutGuard} from './guards/auth/logged-out.guard';

export const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[loggedOutGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
];
