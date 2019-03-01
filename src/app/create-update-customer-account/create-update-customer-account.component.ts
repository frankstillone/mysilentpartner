import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormioAuthService } from 'angular-formio/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Formio } from 'formiojs';
import * as $ from 'jquery';

@Component({
    selector: 'app-create-update-customer-account',
    templateUrl: './create-update-customer-account.component.html',
    styleUrls: ['./create-update-customer-account.component.scss']
})
export class CreateUpdateCustomerAccountComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    loading: boolean = false;
    accountId: any;
    showEditMode: boolean = false;
    newAccountFormio: any;
    editAccountFormio: any;
    public newAccountForm: any;
    public editAccountForm: any;
    accountDetails: any;
    oldAccountDetails: any;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute,
        private auth: FormioAuthService, private router: Router) {
    }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.activatedRoute.queryParams.subscribe(params => {
                this.accountId = params['accountId'];
                if (this.accountId) {
                    this.getAccountDetails();
                    this.editAccountFormio = new Formio(this.appConfig.appUrl + '/updateaccount/submission');
                    this.editAccountFormio.loadForm().then(form => (this.editAccountForm = form));
                } else {
                    this.newAccountFormio = new Formio(this.appConfig.appUrl + '/account/submission');
                    this.newAccountFormio.loadForm().then(form => (this.newAccountForm = form));
                    this.showEditMode = false;
                }
            });
        });
    }

    getAccountDetails(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/account/submission?_id=' + this.accountId, options).subscribe((res: any) => {
            let respon = res.json();
            this.oldAccountDetails = res.json()[0];
            this.accountDetails = respon[0];
            this.showEditMode = true;
            this.loading = false;
        });
    }

    saveAccount(event) {
        this.loading = true;
        const eventI = event;
        eventI.data.userName = Formio.currentUser().__zone_symbol__value;
        this.newAccountFormio.saveSubmission(eventI).then((created) => {
            this.loading = false;
            this.router.navigate(['customerServices'], { queryParams: { accountId: created._id } });
        });
    }

    updateAccount(event) {
        this.loading = true;
        const submission = event;
        submission.data.accountName = this.oldAccountDetails.data.accountName;
        submission.data.companyName = this.oldAccountDetails.data.companyName;
        submission._id = this.accountId;
        var updateAccount = new Formio(this.appConfig.appUrl + '/account/submission');
        updateAccount.saveSubmission(submission).then((updated) => {
            this.loading = false;
            this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
        });
    }

}
