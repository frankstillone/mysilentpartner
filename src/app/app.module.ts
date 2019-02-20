import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppConfig } from './config';
import { FormioAppConfig, FormioModule } from 'angular-formio';
import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';
import { FormioResources } from 'angular-formio/resource';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
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
import { EmployeeFormModule } from './employee-form/employee-form.module';

@NgModule({
    declarations: [
        AppComponent,
        AdminHomeComponent,
        EmployeeHomeComponent,
        OperatorHomeComponent,
        CustomerHomeComponent,
        CustomerServicesComponent,
        CreateCustomerAccountComponent,
        EmployeeFormComponent,
        ResetPasswordComponent,
        SubmitResetPasswordComponent,
        NewPaymentComponent,
        UpdatePaymentComponent,
        CustomerResetPasswordComponent,
        EmployeeResetPasswordComponent,
        SubmitEmployeeResetPasswordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormioModule,
        FormsModule,
        ReactiveFormsModule,
        EmployeeFormModule
    ],
    providers: [
        FormioAuthService,
        FormioResources,
        {
            provide: FormioAppConfig, useValue: AppConfig
        },
        {
            provide: FormioAuthConfig, useValue: {
                login: {
                    form: 'user/login'
                },
                register: {
                    form: 'user/register'
                }
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
