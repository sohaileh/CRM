
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopwidgetComponent } from './components/main/topwidget/topwidget.component'
import { SalesbymonthComponent } from './components/main/salesbymonth/salesbymonth.component'
////////////////////////

import{NgxChartsModule} from '@swimlane/ngx-charts';
import { PurchasebymonthComponent } from './components/main/purchasebymonth/purchasebymonth.component'
import { ModuleModule } from '../shared/module/module.module';



@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    DashboardComponent,
    TopwidgetComponent,
    SalesbymonthComponent,
    PurchasebymonthComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    ModuleModule,
  ],exports:[HeaderComponent]
})
export class DashboardModule { }
