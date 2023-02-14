import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesComponent } from './sales/components/add-sales/add-sales.component';
import { SalesListComponent } from './sales/components/sales-list/sales-list.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { AuthGuard } from './authentication/authGuard/auth.guard';

const routes: Routes = [
  {path:"admin/login",component:LoginComponent},
  {path:"admin/dashboard",loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule),canActivate:[AuthGuard]},
  {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
  {path:"admin/sales",children:[
    {
      path:"addsale",component:AddSalesComponent,

    },{
      path:"updatesale",component:AddSalesComponent,

    },
    {
      path:"saleslist",component:SalesListComponent,
    }
  ],canActivate:[AuthGuard]},

  {path:"admin/purchase",loadChildren:()=>import('./purchase/purchase.module').then((m)=>m.PurchaseModule),canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
