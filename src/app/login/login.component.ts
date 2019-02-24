import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public auth: FormioAuthService, public router: Router, private http: Http, private authService: AuthService) { }

    ngOnInit() {
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

}
