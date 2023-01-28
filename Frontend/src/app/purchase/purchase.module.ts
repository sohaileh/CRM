import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProductComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatStepperModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class PurchaseModule { }
