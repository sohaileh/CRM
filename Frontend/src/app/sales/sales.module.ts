import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import {FlexLayoutModule} from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AddSalesComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class SalesModule { }
