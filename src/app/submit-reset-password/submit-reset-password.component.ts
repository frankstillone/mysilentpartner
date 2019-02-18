import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { Router } from '@angular/router';
import { Formio } from 'formiojs';
import { FormioAuthService } from 'angular-formio/auth';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-submit-reset-password',
    templateUrl: './submit-reset-password.component.html',
    styleUrls: ['./submit-reset-password.component.scss']
})
export class SubmitResetPasswordComponent implements OnInit {

    public appConfig = AppConfig;
    resetPasswordForm: any;
    formio: any;
    public form: any;

    constructor(public auth: FormioAuthService, private router: Router, private authService: AuthService) {
        this.formio = new Formio(this.appConfig.appUrl + '/customerresetform');
    }
    
    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
    }

    onSubmit(submission: any) {
        const customer = new Formio(this.appConfig.appUrl + '/customer/submission/' + this.auth.user._id);
        this.auth.user.data.password = submission.data.newPassword;
        this.authService.setRoleId(null);
        this.auth.ready.then(() => {
            this.authService.setGlobalRole(this.auth.is);
        });
        this.authService.setUserName(null);
        customer.saveSubmission(this.auth.user).then(() => {
            this.router.navigate(['/customerHome']);
        });
    }

}
