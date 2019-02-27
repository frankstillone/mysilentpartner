import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    formio: any;
    public form: any;
    loading: boolean = false;
    accountId: any;
    accountDetails: any;

    constructor(private authService: AuthService, private http: Http, public auth: FormioAuthService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['account'];
        });
        this.formio = new Formio(this.appConfig.appUrl + '/createcustomerforcustomer');
    }

    ngOnInit() {
        this.loading = true;
        this.auth.ready.then(() => {
            this.formio.loadForm().then(form => (this.form = form));
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.getAccount();
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

    createCustomer(event) {
        this.loading = true;
        const submission = event;
        var createCustomer = new Formio(this.appConfig.appUrl + '/customer/submission');
        var updateAccountForCustomer = new Formio(this.appConfig.appUrl + '/customeraccount/submission');
        createCustomer.saveSubmission(submission).then((created) => {
            submission.data.account = this.accountDetails;
            submission.data.customer = created;
            updateAccountForCustomer.saveSubmission(submission).then((updateCustomerAccount) => {
                this.loading = false;
                this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
            });

        });
    }

}
