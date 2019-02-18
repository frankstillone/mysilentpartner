import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';

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
    expiredType:boolean = false;
    noPaymentMethod: boolean = false;
    emailProcessingServices: any;
    liveChatServices: any;
    callAnsweringServices: any;
    addressLicenseServices: any;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private router: Router, public auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.activatedRoute.queryParams.subscribe(params => {
                this.accountId = params['accountId'];
                this.getAccountDetails();
                this.getUsersForAccount();
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

    getUsersForAccount() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/userAccount/submission?data.account._id=' + this.accountId, options).subscribe((res: any) => {
            let respon = res.json();
            this.customerUser = respon;
            this.loading = false;
        });
    }

    newPayment() {
        this.router.navigate(['payment'], {queryParams: {service: this.accountId }});
    }

    updatePayment(paymentId) {
        this.router.navigate(['updatePayment'], {queryParams: {service: this.accountId, id: paymentId }});
    }

    getPayment() {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/accountpaymentinformation/submission?data.accountId=' + this.accountId, options).subscribe((res: any) => {
            let respon = res.json();
            this.paymentInformation = respon[0];
            if(this.paymentInformation) {
                if(respon[0].data.paymentType === "Visa/Master Card") {
                    this.cardType = true;
                } else if(respon[0].data.paymentType === "Direct Debit") {
                    this.directDebitType = true;
                } else if(respon[0].data.paymentType === "expired") {
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

}
