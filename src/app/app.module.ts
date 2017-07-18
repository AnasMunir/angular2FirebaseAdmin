import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { routing } from "./app.routing";
// import { QRCodeModule } from 'angular2-qrcode';

import { AppComponent } from './app.component';
import { CustomerService } from "./_services/index";
import { CustomersComponent } from './customers/customers.component';
import { environment } from "../environments/environment";
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    // QRCodeModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    routing
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
