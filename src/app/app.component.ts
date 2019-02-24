import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { AppConfig } from './config';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public appConfig = AppConfig;
    localStorageRole: any;
    customerLogin: boolean = true;
    employeeLogin: boolean = false;
    adminLogin: boolean = false;
    customerRegistration: boolean = false;
    customerResetPassword: boolean = false;
    employeeResetPassword: boolean = false;
    adminResetPassword: boolean = false;
    showAlertBox = false;
    alertMessage: any;

    constructor(public auth: FormioAuthService, public router: Router, private http: Http, private authService: AuthService) {
        this.auth.onLogin.subscribe(() => {
            this.navigator();
        });

        this.auth.onLogout.subscribe(() => {
            this.authService.destroyRoles();
            this.router.navigate(['auth']);
        });
    }

    ngOnInit() {
        this.auth.ready.then(() => {
            if (!this.auth.authenticated) {
                this.router.navigate(['']);
            }
            this.authService.setGlobalRole(this.auth.is);
            this.authService.setUserName(null);
            this.authService.setRoleId(null);
            this.authService.setFirstAndLastName();
        });
    }

    onSubmit(event) {
        this.auth.setUser(event);
        this.navigator();
    }

    showMessage(showMessageFor) {
        this.customerLogin = false;
        this.employeeLogin = false;
        this.adminLogin = false;
        this.customerRegistration = false;
        this.customerResetPassword = false;
        this.employeeResetPassword = false;
        this.adminResetPassword = false;
        if (showMessageFor === 'customerRegistration') {
            this.showAlertBox = true;
            this.alertMessage = "Thank you for the registration. We have sent an email to the given email address. Please check your inbox to set your password.";
        } else if (showMessageFor === 'customerResetPassword' || showMessageFor === 'employeeResetPassword' || showMessageFor === 'adminResetPassword') {
            this.showAlertBox = true;
            this.alertMessage = "Thank you. Please check your inbox to reset your password.";
        }
    }

    navigator(): void {
        this.auth.ready.then(() => {
            this.authService.setGlobalRole(this.auth.is);
            this.authService.setUserName(null);
            this.authService.setRoleId(null);
            this.authService.setFirstAndLastName();
            if (this.auth.is.adminl1) {
                this.router.navigate(['adminHome']);
            } else if (this.auth.is.employee) {
                this.router.navigate(['employeeHome']);
            } else if (this.auth.is.operator) {
                this.router.navigate(['operatorHome']);
            } else if (this.auth.is.customer) {
                this.router.navigate(['customerHome']);
            }
        });
        if (!this.auth.authenticated) {
            this.router.navigate(['']);
        }
    }

    changeLoginView(changeViewTo) {
        if (!this.auth.authenticated) {

            this.customerLogin = false;
            this.employeeLogin = false;
            this.adminLogin = false;
            this.customerRegistration = false;
            this.customerResetPassword = false;
            this.employeeResetPassword = false;
            this.adminResetPassword = false;
            this.showAlertBox = false;
            this.alertMessage = "";

            if (changeViewTo === 'customer') {
                this.customerLogin = true;
            } else if (changeViewTo === 'employee') {
                this.employeeLogin = true;
            } else if (changeViewTo === 'admin') {
                this.adminLogin = true;
            } else if (changeViewTo === 'customerRegistration') {
                this.customerRegistration = true;
            } else if (changeViewTo === 'customerResetPassword') {
                this.customerResetPassword = true;
            } else if (changeViewTo === 'employeeResetPassword') {
                this.employeeResetPassword = true;
            } else if (changeViewTo === 'adminResetPassword') {
                this.adminResetPassword = true;
            }
        }
    }

}
