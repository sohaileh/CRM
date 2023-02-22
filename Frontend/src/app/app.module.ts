import { NavbarModule } from './navbar/navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { PurchaseModule } from "./purchase/purchase.module";
import { AuthenticationModule } from './authentication/authentication.module';
import { NotFoundModule } from './error/not-found.module';
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    DashboardModule,
    PurchaseModule,
    NotFoundModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
