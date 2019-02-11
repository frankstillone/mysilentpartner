import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';

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

    constructor(private authService: AuthService, private http: Http) {}

    ngOnInit() {
        if (this.authService.getGlobalRole() === this.authService.customer) {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            this.getAllAccountDetails();
        } else {
            this.showCustomerScreen = false;
        }
    }

    getAllAccountDetails(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
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