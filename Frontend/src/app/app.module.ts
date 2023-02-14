import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { PurchaseModule } from "./purchase/purchase.module";
import { AuthenticationModule } from './authentication/authentication.module';
import { SalesModule } from './sales/sales.module';
import { NotfoundRoutingModule } from './not-found/notfound-routing.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    DashboardModule,
    SalesModule,
    PurchaseModule,
    AppRoutingModule,
    NotfoundRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
