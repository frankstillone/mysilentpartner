import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';
import { SubmitEmployeeResetPasswordComponent } from './submit-employee-reset-password/submit-employee-reset-password.component';
import { SubmitCustomerResetPasswordComponent } from './submit-customer-reset-password/submit-customer-reset-password.component';
import { LoginComponent } from './login/login.component';
import { SubmitAdminResetPasswordComponent } from './submit-admin-reset-password/submit-admin-reset-password.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateUpdateCustomerAccountComponent } from './create-update-customer-account/create-update-customer-account.component';
import { CreateAccountServiceComponent } from './create-account-service/create-account-service.component';
import { UpdateAccountServiceComponent } from './update-account-service/update-account-service.component';
import { AddressLicenseHomeComponent } from './address-license-home/address-license-home.component';
import { CallAnsweringHomeComponent } from './call-answering-home/call-answering-home.component';
import { LiveChatHomeComponent } from './live-chat-home/live-chat-home.component';
import { EmailProcessingHomeComponent } from './email-processing-home/email-processing-home.component';

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
        path: 'createOrUpdateCustomerAccount',
        component: CreateUpdateCustomerAccountComponent
    },
    {
        path: 'createCustomer',
        component: CreateCustomerComponent
    },
    {
        path: 'employeeForm',
        component: EmployeeFormComponent,
    },
    {
        path: 'submitCustomerResetPassword',
        component: SubmitCustomerResetPasswordComponent
    },
    {
        path: 'submitEmployeeResetPassword',
        component: SubmitEmployeeResetPasswordComponent
    },
    {
        path: 'submitAdminResetPassword',
        component: SubmitAdminResetPasswordComponent
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
        path: 'createAccountService',
        component: CreateAccountServiceComponent
    },
    {
        path: 'updateAccountService',
        component: UpdateAccountServiceComponent
    },
    {
        path: 'addressLicenseHome',
        component: AddressLicenseHomeComponent
    },
    {
        path: 'callAnsweringHome',
        component: CallAnsweringHomeComponent
    },
    {
        path: 'liveChatHome',
        component: LiveChatHomeComponent
    },
    {
        path: 'emailProcessingHome',
        component: EmailProcessingHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
