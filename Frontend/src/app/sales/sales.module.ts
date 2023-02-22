import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { ModuleModule } from '../shared/module/module.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LayoutsComponent } from './layouts/layouts.component';
import { SalesRoutingModule } from './sales-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
@NgModule({
  declarations: [
    AddSalesComponent,
    SalesListComponent,
    LayoutsComponent
    ],
  imports: [
    CommonModule,
    NavbarModule,
    SalesRoutingModule,
    ModuleModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class SalesModule { }
