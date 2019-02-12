import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'adminHome',
        component: AdminHomeComponent
    },
    {
        path: 'employeeHome',
        component: EmployeeHomeComponent
    },
    {
        path: 'customerHome',
        component: CustomerHomeComponent
    },
    {
        path: 'operatorHome',
        component: OperatorHomeComponent
    },
    {
        path: 'customerServices',
        component: CustomerServicesComponent
    },
    {
        path: 'createCustomerAccount',
        component: CreateCustomerAccountComponent
    },
    {
        path: 'employeeForm',
        component: EmployeeFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
