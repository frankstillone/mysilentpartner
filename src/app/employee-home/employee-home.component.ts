import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { FormioAuthService } from 'angular-formio/auth';

@Component({
    selector: 'app-employee-home',
    templateUrl: './employee-home.component.html',
    styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

    showEmployeeScreen: boolean = false;
    public appConfig = AppConfig;
    loading: boolean = false;
    availableForms: any;
    firstAndLastName: any;
    totalPages: any;
    totalRecords: any;
    skipEntries: number = 0;
    showPrevious: boolean = false;
    showNext: boolean = false;
    showFirst: boolean = false;
    showLast: boolean = false;

    constructor(private authService: AuthService, private http: Http, private auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showEmployeeScreen = this.authService.showEmployeeScreen;
            this.firstAndLastName = this.authService.getFirstAndLastName();
            this.getEmployeeForms(0, '', true);
        });
    }

    getEmployeeForms(skipEntries, searchUserName, firstTime): void {
        if (firstTime) {
            this.skipEntries = 0;
        }
        this.loading = true;
        var headers = new Headers();
        headers.append("x-jwt-token", this.authService.getJwtToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/form?type=form&submissionAccess.roles=' + this.authService.getRoleId()+'&skip=' + skipEntries, options).subscribe((res: any) => {
            this.pagination((res.headers._headers.get('content-range')[0]).split("/").pop());
            let respon = res.json();
            this.availableForms = respon;
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

        if (userType == "employeeForms") {
            this.getEmployeeForms(this.skipEntries, '', false);
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
