import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModuleModule } from '../shared/module/module.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
     ModuleModule
  ]
},
)
export class AuthenticationModule { }
