import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppConfig } from './config';
import { FormioAppConfig, FormioModule } from 'angular-formio';
import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';
import { HttpModule } from '@angular/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerServicesComponent } from './customer-services/customer-services.component';
import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminHomeComponent,
        EmployeeHomeComponent,
        OperatorHomeComponent,
        CustomerHomeComponent,
        CustomerServicesComponent,
        CreateCustomerAccountComponent,
        EmployeeFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormioModule
    ],
    providers: [
        FormioAuthService,
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
