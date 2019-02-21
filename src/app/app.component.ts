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
            this.authService.setGlobalRole(this.auth.is);
        });
        this.authService.setRoleId(null);
        this.authService.setUserName(null);
    }

    onSubmit(event) {
        this.auth.setUser(event);
        this.navigator();
    }

    navigator(): void {
        this.auth.ready.then(() => {
            this.authService.setGlobalRole(this.auth.is);
            this.authService.setUserName(null);
            this.authService.setRoleId(null);
            if (this.auth.is.administrator) {
                this.router.navigate(['adminHome']);
            } else if (this.auth.is.employee) {
                this.router.navigate(['employeeHome']);
            } else if (this.auth.is.operator) {
                this.router.navigate(['operatorHome']);
            } else if (this.auth.is.customer) {
                this.router.navigate(['customerHome']);
            }
        });
    }

    changeLoginView(changeViewTo) {
        if (!this.auth.authenticated) {
            if (changeViewTo === 'customer') {
                this.customerLogin = true;
                this.employeeLogin = false;
                this.adminLogin = false;
            } else if (changeViewTo === 'employee') {
                this.employeeLogin = true;
                this.customerLogin = false;
                this.adminLogin = false;
            } else if (changeViewTo === 'admin') {
                this.adminLogin = true;
                this.customerLogin = false;
                this.employeeLogin = false;
            }
        }
    }

}
