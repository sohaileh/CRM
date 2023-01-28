import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { PurchaseModule } from "./purchase/purchase.module";
import { AuthenticationModule } from './authentication/authentication.module';
import { SalesModule } from './sales/sales.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthenticationModule,
    PurchaseModule,
    SalesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
