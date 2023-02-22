import { ModuleModule } from './../shared/module/module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModuleModule } from '../shared/module/module.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    ModuleModule
<<<<<<< Updated upstream
  ],
  exports:[HeaderComponent]
=======
  ],exports:[HeaderComponent,FooterComponent]
>>>>>>> Stashed changes
})
export class NavbarModule { }
