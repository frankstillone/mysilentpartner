import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';

@Component({
    selector: 'app-customer-services',
    templateUrl: './customer-services.component.html',
    styleUrls: ['./customer-services.component.scss']
})
export class CustomerServicesComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    accountId: any;
    accountNumber: any;
    accountName: any;
    abn: any;
    tradingName: any;
    loading: boolean = false;
    accountDetails: any;
    customerUser: any;
    paymentInformation: any;
    cardType: boolean = false;
    directDebitType: boolean = false;
    expiredType: boolean = false;
    noPaymentMethod: boolean = false;
    emailProcessingServices: any;
    liveChatServices: any;
    callAnsweringServices: any;
    addressLicenseServices: any;
    totalPages: any;
    totalRecords: any;
    skipEntries: number = 0;
    showPrevious: boolean = false;
    showNext: boolean = false;
    showFirst: boolean = false;
    showLast: boolean = false;
    searchString: any = '';
    accountPayments: any;
    accountInvoices: any;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private router: Router, public auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.activatedRoute.queryParams.subscribe(params => {
                this.accountId = params['accountId'];
                this.getAccountDetails();
                this.getUsersForAccount(0, '', true);
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
            this.accountDetails = respon[0].data;
            this.loading = false;
        });
    }

    getUsersForAccount(skipEntries, searchQuery, firstTime) {
        if (firstTime) {
            this.skipEntries = 0;
            this.searchString = '';
        }
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        let searchingQuery = searchQuery != '' ? '&data.customer.data.userName__regex=/' + searchQuery + '/i' : '';
        this.http.get(this.appConfig.appUrl + '/customeraccount/submission?data.account._id=' + this.accountId + '&skip=' + skipEntries + searchingQuery, options).subscribe((res: any) => {
            this.pagination((res.headers._headers.get('content-range')[0]).split("/").pop());
            let respon = res.json();
            this.customerUser = respon;
            this.loading = false;
        });
    }

    editChildCustomer(customerType, customerId) {
        if(customerType == 'child') {
            this.router.navigate(['createUpdateCustomer'], {queryParams: { customerId: customerId, accountId: this.accountId }});
        } else if(customerType == "parent") {
            this.router.navigate(['createUpdateCustomer'], {queryParams: { customerId: customerId, accountId: this.accountId, customerType: 'parent' }});
        }
    }

    newPayment() {
        this.router.navigate(['payment'], { queryParams: { account: this.accountId } });
    }

    updatePayment(paymentId) {
        this.router.navigate(['updatePayment'], { queryParams: { account: this.accountId, id: paymentId } });
    }

    getPayment() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/accountpaymentinformation/submission?data.account._id=' + this.accountId, options).subscribe((res: any) => {
            let respon = res.json();
            if (respon[0]) {
                this.paymentInformation = respon[0];
                if (respon[0].data.paymentType === "Credit Card") {
                    let month = respon[0].data.day.substr(0, respon[0].data.day.indexOf('/'));
                    var parts = respon[0].data.day.split("/");
                    let year = parts[parts.length - 1];
                    this.paymentInformation.data.day = month + '/' + year;
                    this.cardType = true;
                } else if (respon[0].data.paymentType === "Direct Debit") {
                    this.directDebitType = true;
                } else if (respon[0].data.paymentType === "expired") {
                    this.expiredType = true;
                } else {
                    this.noPaymentMethod = true;
                }
            } else {
                this.noPaymentMethod = true;
            }
            this.loading = false;
        });
    }

    getAccountServices(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/emailprocessingservice/submission?data.accountName._id=' + this.accountId, options).subscribe((res: any) => {
            this.emailProcessingServices = res.json();
            this.loading = false;
        });
        this.http.get(this.appConfig.appUrl + '/livechatservice/submission?data.accountName._id=' + this.accountId, options).subscribe((res: any) => {
            this.liveChatServices = res.json();
            this.loading = false;
        });
        this.http.get(this.appConfig.appUrl + '/callansweringservice/submission?data.accountName._id=' + this.accountId, options).subscribe((res: any) => {
            this.callAnsweringServices = res.json();
            this.loading = false;
        });
        this.http.get(this.appConfig.appUrl + '/addresslicenseservice/submission?data.accountName._id=' + this.accountId, options).subscribe((res: any) => {
            this.addressLicenseServices = res.json();
            this.loading = false;
        });
    }

    disableCustomer(customerId, index) {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customer/submission/'+customerId, options).subscribe((res: any) => {
            let response = res.json();
            response.data.status = "Inactive";
            const customer = new Formio(this.appConfig.appUrl + '/customer/submission/');
            customer.saveSubmission(response).then(() => {
                this.customerUser[index].data.customer.data.status = "Inactive";
                this.loading = false;
            });
        });
    }

    enableCustomer(customerId, index) {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customer/submission/'+customerId, options).subscribe((res: any) => {
            let response = res.json();
            response.data.status = "Active";
            const customer = new Formio(this.appConfig.appUrl + '/customer/submission/');
            customer.saveSubmission(response).then(() => {
                this.customerUser[index].data.customer.data.status = "Active";
                this.loading = false;
            });
        });
    }

    getInvoicesForAccount() {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', this.appConfig.simpleBillingXAuthToken);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.tspBilling + "/invoice/user/" + this.accountDetails.jbId, options).subscribe((res: any) => {
            this.accountInvoices = res.json();
        });
    }

    getPaymentsForAccount() {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', this.appConfig.simpleBillingXAuthToken);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.tspBilling + "/payment/user/" + this.accountDetails.jbId, options).subscribe((res: any) => {
            this.accountPayments = res.json();
        });
    }

    downloadInvoice(invoiceId) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', this.appConfig.simpleBillingXAuthToken);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.tspBilling + "/invoice/downloadPdf/" + invoiceId, options).subscribe((res: any) => {
            window.location.href = res.url;
        });
    }

    showDataByPage(actionType, skipEntries: number, paginationFor, searchString) {
        skipEntries = Number(skipEntries);
        if (actionType == 'search') {
            this.searchString = searchString;
        }
        if (this.skipEntries == 0 && actionType == 'next') {
            this.skipEntries = 10;
        } else if (this.skipEntries > 0 && actionType == 'next') {
            this.skipEntries = this.skipEntries + skipEntries;
        } else if (this.skipEntries > 0 && actionType == 'previous') {
            this.skipEntries = this.skipEntries - skipEntries;
        } else if (actionType == 'first') {
            this.skipEntries = 0;
        } else if (actionType == 'last') {
            //Emit last digit of total records and replaced with 0 to skip starting pages
            this.skipEntries = Number(this.totalRecords.slice(0, -1) + '0');
        } else {
            this.skipEntries = skipEntries;
        }

        if (paginationFor == "customers") {
            this.getUsersForAccount(this.skipEntries, this.searchString, false);
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
