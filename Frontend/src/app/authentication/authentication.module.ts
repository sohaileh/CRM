import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ModuleModule } from '../shared/module/module.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
     ModuleModule,
     AuthRoutingModule,
     LoaderModule
  ],
  providers: []
},
)
export class AuthenticationModule { }
