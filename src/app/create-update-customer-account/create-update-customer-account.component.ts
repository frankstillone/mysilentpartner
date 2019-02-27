import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { AuthService } from '../auth.service';
import { Http } from '@angular/http';
import { FormioAuthService } from 'angular-formio/auth';
import { ActivatedRoute, Router } from '@angular/router';
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

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute,
        private auth: FormioAuthService, private router: Router) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['accountId'];
        });
    }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showCustomerScreen = this.authService.showCustomerScreen;
            setTimeout(function () {
                $("input[name='data[accountNumber]']").prop('disabled', true);
                $("input[name='data[accountName]']").prop('disabled', true);
            }, 2000)
        });
    }

    onSubmit(event) {
        this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
    }

}
