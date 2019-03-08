import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';
import { Router, ActivatedRoute } from '@angular/router';
import { Key } from 'protractor';

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
    customerId: any;
    accountDetails: any;
    customerDetails: any;
    showCreateCustomer: boolean = true;
    showChildCustomer: boolean = false;
    showParentCustomer: boolean = false;
    showAlertBox: boolean = false;
    errorMessage: any;

    constructor(private authService: AuthService, private http: Http, public auth: FormioAuthService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.formio = new Formio(this.appConfig.appUrl + '/createcustomerforcustomer');
    }

    ngOnInit() {
        this.loading = true;
        this.auth.ready.then(() => {
            this.formio.loadForm().then(form => (this.form = form));
            this.activatedRoute.queryParams.subscribe(params => {
                this.accountId = params['accountId'];
                this.getAccount();
                if (params['customerId'] && !params['customerType']) {
                    this.customerId = params['customerId'];
                    this.showChildCustomer = true;
                    this.showCreateCustomer = false;
                    this.getCustomerFromAccount();
                }
                if (params['customerType'] == 'parent') {
                    this.customerId = params['customerId'];
                    this.showParentCustomer = true;
                    this.showChildCustomer = false;
                    this.showCreateCustomer = false;
                    this.getCustomer();
                }
            });
            this.showCustomerScreen = this.authService.showCustomerScreen;
        });
        const css = 'formio-alerts {display: none;}';
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
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

    getCustomer() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customer/submission?_id=' + this.customerId, options).subscribe((res: any) => {
            let respon = res.json()[0];
            this.customerDetails = respon;
            this.customerDetails.data.role = "Admin";
            this.customerDetails.data.status = "Active";
        });
    }

    getCustomerFromAccount() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customeraccount/submission?data.account._id=' + this.accountId + '&data.customer._id=' + this.customerId, options).subscribe((res: any) => {
            let respon = res.json()[0];
            this.customerDetails = respon;
            this.customerDetails.data.firstName = respon.data.customer.data.firstName;
            this.customerDetails.data.lastName = respon.data.customer.data.lastName;
            this.customerDetails.data.email = respon.data.customer.data.email;
            this.customerDetails.data.userName = respon.data.customer.data.userName;
        });
    }

    createCustomer(event) {
        this.showAlertBox = false;
        this.errorMessage = "";
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
        }, (error: any) => {
            this.loading = false;
            this.showAlertBox = true;
            Object.keys(error.details).forEach((key) => {
                if (error.details[key].message) {
                    if(this.errorMessage) {
                        this.errorMessage = this.errorMessage + "<br>" + error.details[key].message;
                    } else {
                        this.errorMessage = error.details[key].message;
                    }
                }
            });
        });
    }

    updateChildCustomer(event) {
        this.loading = true;
        const submission = event;
        var updateCustomer = new Formio(this.appConfig.appUrl + '/customer/submission');
        var updateAccountForCustomer = new Formio(this.appConfig.appUrl + '/customeraccount/submission');
        submission._id = this.customerId;
        updateCustomer.saveSubmission(submission).then((updated) => {
            submission._id = this.customerDetails._id;
            submission.data.account = this.accountDetails;
            submission.data.customer = updated;
            if(!this.showParentCustomer) {
                updateAccountForCustomer.saveSubmission(submission).then((updateCustomerAccount) => {
                    this.loading = false;
                    this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
                });
            } else {
                this.loading = false;
                this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
            }
        }, (error: any) => {
            this.loading = false;
            this.showAlertBox = true;
            Object.keys(error.details).forEach((key) => {
                if (error.details[key].message) {
                    if(this.errorMessage) {
                        this.errorMessage = this.errorMessage + "<br>" + error.details[key].message;
                    } else {
                        this.errorMessage = error.details[key].message;
                    }
                }
            });
        });
    }

}
