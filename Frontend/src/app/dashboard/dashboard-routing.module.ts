import { TopwidgetComponent } from './components/main/topwidget/topwidget.component';
import { SalesbymonthComponent } from './components/main/salesbymonth/salesbymonth.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

const routes:Routes=[
  {path:'',component:DashboardComponent}
]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class DashboardRoutingModule{}
