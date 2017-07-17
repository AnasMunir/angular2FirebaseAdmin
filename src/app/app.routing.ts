import { Routes, RouterModule } from "@angular/router";

import { CustomersComponent } from "./customers/index";

const appRoutes: Routes = [

    { path: '', component: CustomersComponent }
];

export const routing = RouterModule.forRoot(appRoutes);