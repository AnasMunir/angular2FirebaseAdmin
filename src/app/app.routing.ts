import { Routes, RouterModule } from "@angular/router";

import { CustomersComponent } from "./customers/index";
import { CustomerDetailComponent } from "./customer-detail/index";

const appRoutes: Routes = [
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    { path: 'customers', component: CustomersComponent },
    { path: 'customer/:id', component: CustomerDetailComponent }
];

export const routing = RouterModule.forRoot(appRoutes);