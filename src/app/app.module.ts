import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { routing } from "./app.routing";
// import { QRCodeModule } from 'angular2-qrcode';

import { AppComponent } from './app.component';
import { CustomerService } from "./_services/index";
import { AuthService } from "./_services/auth.service";
import { AuthGuard } from "./_guards/auth.guard";
import { CustomersComponent } from './customers/customers.component';
import { environment } from "../environments/environment";
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // QRCodeModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    routing
  ],
  providers: [
    CustomerService,
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
