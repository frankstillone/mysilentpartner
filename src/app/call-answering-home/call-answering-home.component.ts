import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';

@Component({
    selector: 'app-call-answering-home',
    templateUrl: './call-answering-home.component.html',
    styleUrls: ['./call-answering-home.component.scss']
})
export class CallAnsweringHomeComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    loading: boolean = false;
    serviceId: any;
    serviceDetails: any;
    accountId: any;
    accountDetails: any;

    constructor(private authService: AuthService, private http: Http, public auth: FormioAuthService, private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.serviceId = params['serviceId'];
            this.accountId = params["accountId"];
            this.getService();
            this.getAccount();
        });
    }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
        });
    }

    getAccount() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/account/submission/' + this.accountId, options).subscribe((res: any) => {
            this.accountDetails = res.json();
            this.loading = false;
        });
    }

    getService() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/callansweringservice/submission?_id=' + this.serviceId, options).subscribe((res: any) => {
            this.serviceDetails = res.json()[0];
            this.loading = false;
        });
    }

}
