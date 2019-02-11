import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this.authService.getGlobalRole() === this.authService.customer) {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.activatedRoute.queryParams.subscribe(params => {
                this.accountId = params['service'];
                this.getAccountDetails();
                this.getUsersForAccount();
            });
        } else {
            this.showCustomerScreen = false;
        }
    }

    getAccountDetails(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
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
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customerUsers/submission?data.accountName._id='+this.accountId, options).subscribe((res: any) => {
            let respon = res.json();
            this.customerUser = respon;
            this.loading = false;
        });
    }

}
