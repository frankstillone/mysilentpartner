import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { FormioAuthService } from 'angular-formio/auth';

@Component({
    selector: 'app-customer-home',
    templateUrl: './customer-home.component.html',
    styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    allAccounts: any =  [];
    loading: boolean = false;

    constructor(private authService: AuthService, private http: Http, public auth: FormioAuthService) {}

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.getAllAccountDetails();
            this.updatePayment();
        });
    }

    updatePayment() {
        // var headers = new Headers();
        // headers.append('accept', 'application/json;charset=utf-8');
        // headers.append('Content-Type', 'application/json;charset=utf-8');
        // headers.append('Authorization', 'a53b87d4-eb38-4362-b4f9-5283c61b6047');
        // headers.append('X-Auth-Token', 'a53b87d4-eb38-4362-b4f9-5283c61b6047');
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        // headers.append("Cache-Control", "max-age=0");
        // let options = new RequestOptions({ headers: headers });
        // let formData = {
        //     "user.userId":"10731",
        //     "mainSubscription.periodId":"2",
        //     "user.entityId":"1",
        //     "user.userName":"Mayur Mamoria",
        //     "metaField_19.value":"test1@test.com",
        //     "mainSubscription.nextInvoiceDayOfPeriod":"1",
        //     "user.accountTypeId":"1",
        //     "user.nextInvoiceDate":"03/01/2019",
        //     "paymentMethod_0.paymentMethodTypeId":"5",
        //     "paymentMethod_0.processingOrder":"1",
        //     "0_metaField_114.value":"TestCustomer",
        //     "0_metaField_115.value":"4111111111111152",
        //     "0_metaField_116.value":"12/2020",
        //     "modelIndex":"0",
        //     "paymentMethod_0.id":"",
        //     "paymentMethod_0.paymentMethodId":"",
        //     "currentIndex":"0"
        // }

        // this.http.put('https://simplebilling.in:8443/customer/10731', formData, options).subscribe((res: any) => {
        //     console.log(res);
        //     console.log(res.json());
        // });
    }

    getAllAccountDetails(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/account/submission?data.userName.data.userName=' + this.authService.getUserName(), options).subscribe((res: any) => {
            let respon = res.json();
            this.allAccounts = [];
            Object.keys(respon).forEach((key) => {
                this.allAccounts.push(respon[key]);
            });
            this.loading = false
        });
    }

}