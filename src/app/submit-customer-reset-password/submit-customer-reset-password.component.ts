import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { Router, ActivatedRoute } from '@angular/router';
import { Formio } from 'formiojs';
import { FormioAuthService } from 'angular-formio/auth';
import { AuthService } from '../auth.service';
import { RequestOptions, Headers, Http } from '@angular/http';

@Component({
    selector: 'app-submit-customer-reset-password',
    templateUrl: './submit-customer-reset-password.component.html',
    styleUrls: ['./submit-customer-reset-password.component.scss']
})
export class SubmitCustomerResetPasswordComponent implements OnInit {

    public appConfig = AppConfig;
    resetPasswordForm: any;
    formio: any;
    public form: any;
    login: boolean = false;
    accountId: any;
    customerId: any;
    customerDetails: any;

    //TODO: When login with customer, email or just change password

    constructor(public auth: FormioAuthService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, public http: Http) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['login']) {
                this.login = true;
                this.accountId = params['accountId'];
                this.customerId = params['customerId'];
                this.getCustomer();
            }
        });
        this.formio = new Formio(this.appConfig.appUrl + '/customerresetpassword');
    }

    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
    }

    getCustomer() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/customer/submission?_id=' + this.customerId, options).subscribe((res: any) => {
            let respon = res.json()[0];
            this.customerDetails = respon;
        });
    }

    onSubmit(submission: any) {
        if (this.accountId && this.customerId) {
            const customer = new Formio(this.appConfig.appUrl + '/customer/submission/' + this.customerId);
            this.customerDetails.data.password = submission.data.newPassword;
            submission._id = this.customerId;
            submission.data = this.customerDetails.data;
            customer.saveSubmission(submission).then(() => {
                this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
            });
        } else {
            const customer = new Formio(this.appConfig.appUrl + '/customer/submission/' + this.auth.user._id);
            this.auth.user.data.password = submission.data.newPassword;
            customer.saveSubmission(this.auth.user).then(() => {
                this.authService.setRoleId(null);
                this.auth.ready.then(() => {
                    this.authService.setGlobalRole(this.auth.is);
                });
                this.authService.setUserName(null);
                this.auth.logout();
                this.authService.destroyRoles();
                this.router.navigate(['auth']);
            });
        }
    }

}
