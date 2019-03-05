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
    public roleType: any;
    public firstName: any;
    totalPages: any;
    totalRecords: any;
    skipEntries: number = 0;
    showPrevious: boolean = false;
    showNext: boolean = false;
    showFirst: boolean = false;
    showLast: boolean = false;
    public allEmployees: any;
    public allCustomers: any;
    public allAccounts: any;
    public allServices: any;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private router: Router,
        public auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showAdminScreen = this.authService.showAdminScreen;
            this.firstName = this.authService.getFirstAndLastName();
            this.authService.setUserRoleType();
            this.roleType = this.authService.getUserRoleType();
        });
    }

    onSearchChange(event) {
        this.getEmployeesList(0, event, false);
    }

    getEmployeesList(skipEntries, searchUserName, firstTime) {
        if (firstTime) {
            this.skipEntries = 0;
        }
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/employee/submission?skip=' + skipEntries, options).subscribe((res: any) => {
            this.pagination((res.headers._headers.get('content-range')[0]).split("/").pop());
            let respon = res.json();
            this.allEmployees = respon;
            this.loading = false;
        });
    }

    getCustomerList(skipEntries, searchUserName, firstTime) {
        if (firstTime) {
            this.skipEntries = 0;
        }
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customer/submission?skip=' + skipEntries, options).subscribe((res: any) => {
            this.pagination((res.headers._headers.get('content-range')[0]).split("/").pop());
            let respon = res.json();
            this.allCustomers = respon;
            this.loading = false;
        });
    }

    getAccountList(skipEntries, searchUserName, firstTime) {
        if (firstTime) {
            this.skipEntries = 0;
        }
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/account/submission?skip=' + skipEntries, options).subscribe((res: any) => {
            this.pagination((res.headers._headers.get('content-range')[0]).split("/").pop());
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

    showDataByPage(type, skipEntries: number, userType) {
        skipEntries = Number(skipEntries);
        if (this.skipEntries == 0 && type == 'next') {
            this.skipEntries = 10;
        } else if (this.skipEntries > 0 && type == 'next') {
            this.skipEntries = this.skipEntries + skipEntries;
        } else if (this.skipEntries > 0 && type == 'previous') {
            this.skipEntries = this.skipEntries - skipEntries;
        } else if (type == 'first') {
            this.skipEntries = 0;
        } else if (type == 'last') {
            //Emit last digit of total records and replaced with 0 to skip starting pages
            this.skipEntries = Number(this.totalRecords.slice(0, -1) + '0');
        } else {
            this.skipEntries = skipEntries;
        }

        if (userType == "employee") {
            this.getEmployeesList(this.skipEntries, '', false);
        } else if (userType == "customer") {
            this.getCustomerList(this.skipEntries, '', false);
        } else if(userType == 'account') {
            this.getAccountList(this.skipEntries, '', false);
        }
    }

    pagination(recordsFromServer) {
        this.showPrevious = false;
        this.showNext = false;
        this.totalRecords = recordsFromServer;
        var totalRecords = recordsFromServer;
        this.totalPages = "";
        //Get total pages
        this.totalPages = Math.ceil(totalRecords / 10);
        if (totalRecords <= 10) {
            this.showNext = false;
            this.showPrevious = false;
            this.showLast = false;
            this.showFirst = false;
        } else if (this.skipEntries == 0) {
            this.showNext = true;
            this.showPrevious = false;
            this.showLast = true;
            this.showFirst = false;
        } else if ((totalRecords - this.skipEntries) >= 10) {
            this.showNext = true;
            this.showPrevious = true;
            this.showFirst = true;
            this.showLast = true;
        } else if ((totalRecords - this.skipEntries) <= 10) {
            this.showNext = false;
            this.showPrevious = true;
            this.showFirst = true;
            this.showLast = false;
        }
    }

}

export class Record {
    constructor(public id, public accountName: string, public linkedUsers: number, public linkedServices: number) { }
}