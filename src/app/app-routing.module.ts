import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubmitResetPasswordComponent } from './submit-reset-password/submit-reset-password.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';
import { CustomerResetPasswordComponent } from './customer-reset-password/customer-reset-password.component';
import { EmployeeResetPasswordComponent } from './employee-reset-password/employee-reset-password.component';
import { SubmitEmployeeResetPasswordComponent } from './submit-employee-reset-password/submit-employee-reset-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: LoginComponent
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
        component: EmployeeFormComponent,
    },
    {
        path: 'customerResetPassword',
        component: CustomerResetPasswordComponent
    },
    {
        path: 'submitCustomerResetPassword',
        component: SubmitResetPasswordComponent
    },
    {
        path: 'submitEmployeeResetPassword',
        component: SubmitEmployeeResetPasswordComponent
    },
    {
        path: 'payment',
        component: NewPaymentComponent
    },
    {
        path: 'updatePayment',
        component: UpdatePaymentComponent
    },
    {
        path: 'employeeResetPassword',
        component: EmployeeResetPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
