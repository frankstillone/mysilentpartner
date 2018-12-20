import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppConfig } from './config';
import { FormioAppConfig } from 'angular-formio';
import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FormioAuthService,
    {provide: FormioAppConfig, useValue: AppConfig},
    {provide: FormioAuthConfig, useValue: {
        login: {
          form: 'user/login'
        },
        register: {
          form: 'user/register'
        }
      }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
