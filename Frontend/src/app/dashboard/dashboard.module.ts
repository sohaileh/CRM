import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopwidgetComponent } from './components/main/topwidget/topwidget.component'
import { SalesbymonthComponent } from './components/main/salesbymonth/salesbymonth.component'
////////////////////////
import{MatToolbarModule} from '@angular/material/toolbar'
import{MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import{MatDividerModule} from '@angular/material/divider'
import{MatMenuModule} from '@angular/material/menu'

import{FlexLayoutModule} from '@angular/flex-layout';
import{NgxChartsModule} from '@swimlane/ngx-charts';
import { PurchasebymonthComponent } from './components/main/purchasebymonth/purchasebymonth.component'



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
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
