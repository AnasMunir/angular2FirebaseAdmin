import { Routes, RouterModule } from "@angular/router";

import { CustomersComponent } from "./customers/index";
import { CustomerDetailComponent } from "./customer-detail/index";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./_guards/auth.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
    { path: 'customer/:id', component: CustomerDetailComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);