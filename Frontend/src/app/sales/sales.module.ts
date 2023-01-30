import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { ModuleModule } from '../shared/module/module.module';

@NgModule({
  declarations: [
    AddSalesComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    ModuleModule
  ]
})
export class SalesModule { }
