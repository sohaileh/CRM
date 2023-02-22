import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
  {path:"",component:LayoutsComponent,children:[
    {path:"addsale",component:AddSalesComponent},
    {path:"saleslist",component:SalesListComponent},
    {path:"updatesale",component:AddSalesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
