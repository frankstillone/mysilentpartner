import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { AppConfig } from '../config';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

    loading: boolean = false;
    showAdminScreen: boolean = false;
    public appConfig = AppConfig;
    public allEmployees: any;
    public allCustomers: any;
    public allAccounts: any;
    public allServices: any;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private router: Router,
        public auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showAdminScreen = this.authService.showAdminScreen;
        });
    }

    getEmployeesList() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/employee/submission?limit=10000000000', options).subscribe((res: any) => {
            let respon = res.json();
            this.allEmployees = respon;
            this.loading = false;
        });
    }

    getCustomerList() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customer/submission?limit=10000000000', options).subscribe((res: any) => {
            let respon = res.json();
            this.allCustomers = respon;
            this.loading = false;
        });
    }

    getAccountList() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/account/submission?limit=10000000000', options).subscribe((res: any) => {
            let respon = res.json();
            this.allAccounts = [];
            Object.keys(respon).forEach((key) => {
                let totalLinkedUsers: number;
                let totalLinkedServices: number;
                this.http.get(this.appConfig.appUrl + '/customeraccount/submission?data.account._id=' + respon[key]._id, options).subscribe((response: any) => {
                    let resp = response.json();
                    totalLinkedUsers = resp.length;
                    this.allAccounts.push(new Record(respon[key]._id, respon[key].data.accountName, totalLinkedUsers, 0));
                });
            });
            this.loading = false;
        });
    }

}

export class Record {
    constructor(public id, public accountName: string, public linkedUsers: number, public linkedServices: number) { }
}