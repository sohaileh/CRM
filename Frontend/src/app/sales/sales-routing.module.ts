import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthGuard } from '../authGuard/auth.guard';

const routes: Routes = [
  {path:"",component:LayoutsComponent,children:[
    {path:"addsale",component:AddSalesComponent,canDeactivate:[AuthGuard]},
    {path:"saleslist",component:SalesListComponent},
    {path:"updatesale",component:AddSalesComponent,canDeactivate:[AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
