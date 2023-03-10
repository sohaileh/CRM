import { LoaderModule } from './../loader/loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ViewDetailsComponent } from './component/view-details/view-details.component';
import { ModuleModule } from '../custom-module/material-module';


@NgModule({
  declarations: [
    ViewDetailsComponent
  ],
  imports: [
    ModuleModule,
    CommonModule,
    SharedRoutingModule,
    LoaderModule
  ]
})
export class SharedModule { }
