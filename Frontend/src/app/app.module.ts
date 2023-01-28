import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< Updated upstream
import { DashboardModule } from './dashboard/dashboard.module';
import { PurchaseModule } from "./purchase/purchase.module";
=======
import { AuthenticationModule } from './authentication/authentication.module';

>>>>>>> Stashed changes
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
<<<<<<< Updated upstream
    PurchaseModule
=======
    AuthenticationModule,
>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
