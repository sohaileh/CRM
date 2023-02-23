import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard'
import { NotFoundComponent } from './error/not-found.component';

const routes: Routes = [
  // {path:"admin/login",loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  //  {path:"admin/dashboard",loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule),canActivate:[AuthGuard]},
  // {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
  // {path:"admin/sales",children:[
  //   {
  //     path:"addsale",component:AddSalesComponent,canDeactivate:[AuthGuard],

  //   },{
  //     path:"updatesale",component:AddSalesComponent,canDeactivate:[AuthGuard],

  //   },
  //   {
  //     path:"saleslist",component:SalesListComponent,
  //   }
  // ],canActivate:[AuthGuard]},

  // {path:"admin/purchase",loadChildren:()=>import('./purchase/purchase.module').then((m)=>m.PurchaseModule),canActivate:[AuthGuard]},
  // {path:'**',component:NotFoundComponent}
  {path:"admin",children:[
    {path:"sales",loadChildren:()=>import("./sales/sales.module").then(mod=>mod.SalesModule),canActivate:[AuthGuard]},
    {path:"dashboard",loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule),canActivate:[AuthGuard]},
    {path:"login",loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
    {path:"purchase",loadChildren:()=>import('./purchase/purchase.module').then((m)=>m.PurchaseModule),canActivate:[AuthGuard]}
  ]},
  {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
