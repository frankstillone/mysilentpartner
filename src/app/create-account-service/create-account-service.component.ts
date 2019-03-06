import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';

@Component({
    selector: 'app-create-account-service',
    templateUrl: './create-account-service.component.html',
    styleUrls: ['./create-account-service.component.scss']
})
export class CreateAccountServiceComponent implements OnInit {

    showCustomerScreen: boolean = false;
    public appConfig = AppConfig;
    formio: any;
    public form: any;
    loading: boolean = false;
    accountId: any;
    accountDetails: any;

    constructor(private authService: AuthService, private http: Http, public auth: FormioAuthService, private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['accountId'];
        });
        this.formio = new Formio(this.appConfig.appUrl + '/createserviceforaccount');
    }

    ngOnInit() {
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

    createService(event) {
        this.loading = true;
        const submission = event;
        submission.data.accountName = this.accountDetails;
        var createService = new Formio(this.appConfig.appUrl + '/' + submission.data.parentServiceType + '/submission');
        createService.saveSubmission(submission).then((created) => {
            this.loading = false;
            this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
        });
    }

}
