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

    constructor(public auth: FormioAuthService, public router: Router, private http: Http, private authService: AuthService) {
        this.auth.onLogin.subscribe(() => {
            this.auth.ready.then(() => {
                this.authService.setGlobalRole(this.auth.is);
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
            
            this.authService.setUserName(this.auth.user.data.userName);
            this.authService.setRoleId(this.auth.user.roles[0]);
        });

        this.auth.onLogout.subscribe(() => {
            this.authService.destroyRoles();
            this.router.navigate(['auth/login']);
        });
    }

    ngOnInit() {
        this.auth.ready.then(() => {
            console.log(this.auth.is.customer);
            this.authService.setGlobalRole(this.auth.is);
        });
        this.authService.setRoleId(null);
        this.authService.setUserName(null);
    }

}
