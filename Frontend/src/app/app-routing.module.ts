import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { AuthGuard } from './authentication/authGuard/auth.guard';

const routes: Routes = [
  {path:"admin/login",component:LoginComponent},
  {path:"admin/dashboard",component:DashboardComponent},
  {path: '', redirectTo: '/admin/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
