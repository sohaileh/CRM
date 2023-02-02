import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ModuleModule } from '../shared/module/module.module';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProductComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ModuleModule,
    MatRadioModule,
    FormsModule
  ]
})
export class PurchaseModule { }
