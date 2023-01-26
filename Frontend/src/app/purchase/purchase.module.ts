import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { OwnerDetailComponent } from './components/owner-detail/owner-detail.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';



@NgModule({
  declarations: [
    AddProductComponent,
    OwnerDetailComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatStepperModule,
    FlexLayoutModule
  ],
  exports:[StepperComponent]
})
export class PurchaseModule { }
