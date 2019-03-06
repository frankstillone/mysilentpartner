import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';

@Component({
    selector: 'app-update-account-service',
    templateUrl: './update-account-service.component.html',
    styleUrls: ['./update-account-service.component.scss']
})
export class UpdateAccountServiceComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    formio: any;
    public form: any;
    loading: boolean = false;
    serviceId: any;
    serviceType: any;
    serviceDetails: any;
    accountId: any;
    accountDetails: any;

    constructor(private authService: AuthService, private http: Http, public auth: FormioAuthService, private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.serviceId = params['serviceId'];
            this.serviceType = params['type'];
            this.accountId = params["accountId"];
            this.getService();
            this.getAccount();
        });

    }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            if (this.serviceType == 'callAnswering') {
                this.formio = new Formio(this.appConfig.appUrl + '/callansweringservice/submission');
            }
            if (this.serviceType == 'addressLicence') {
                this.formio = new Formio(this.appConfig.appUrl + '/addresslicenseservice/submission');
            }
            if (this.serviceType == 'liveChat') {
                this.formio = new Formio(this.appConfig.appUrl + '/livechatservice/submission');
            }
            if (this.serviceType == 'email') {
                this.formio = new Formio(this.appConfig.appUrl + '/emailprocessingservice/submission');
            }
            this.formio.loadForm().then(form => (this.form = form));
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
        if (this.serviceType == 'callAnswering') {
            this.http.get(this.appConfig.appUrl + '/callansweringservice/submission?_id=' + this.serviceId, options).subscribe((res: any) => {
                this.serviceDetails = res.json()[0];
                this.loading = false;
            });
        }
        if (this.serviceType == 'addressLicence') {
            this.http.get(this.appConfig.appUrl + '/addresslicenseservice/submission?_id=' + this.serviceId, options).subscribe((res: any) => {
                this.serviceDetails = res.json()[0];
                this.loading = false;
            });
        }
        if (this.serviceType == 'liveChat') {
            this.http.get(this.appConfig.appUrl + '/livechatservice/submission?_id=' + this.serviceId, options).subscribe((res: any) => {
                this.serviceDetails = res.json()[0];
                this.loading = false;
            });
        }
        if (this.serviceType == 'email') {
            this.http.get(this.appConfig.appUrl + '/emailprocessingservice/submission?_id=' + this.serviceId, options).subscribe((res: any) => {
                this.serviceDetails = res.json()[0];
                this.loading = false;
            });
        }
    }

    updateService(event) {
        this.loading = true;
        const submission = event;
        submission._id = this.serviceId;
        this.formio.saveSubmission(submission).then((updated) => {
            this.loading = false;
            this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
        });
    }

}
