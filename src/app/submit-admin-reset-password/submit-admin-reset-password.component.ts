import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { Router } from '@angular/router';
import { Formio } from 'formiojs';
import { FormioAuthService } from 'angular-formio/auth';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-submit-admin-reset-password',
    templateUrl: './submit-admin-reset-password.component.html',
    styleUrls: ['./submit-admin-reset-password.component.scss']
})
export class SubmitAdminResetPasswordComponent implements OnInit {

    public appConfig = AppConfig;
    resetPasswordForm: any;
    formio: any;
    public form: any;

    constructor(public auth: FormioAuthService, private router: Router, private authService: AuthService) {
        this.formio = new Formio(this.appConfig.appUrl + '/adminresetpassword');
    }

    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
    }

    onSubmit(submission: any) {
        const admin = new Formio(this.appConfig.appUrl + '/admin/submission/' + this.auth.user._id);
        this.auth.user.data.password = submission.data.newPassword;
        this.authService.setRoleId(null);
        this.auth.ready.then(() => {
            this.authService.setGlobalRole(this.auth.is);
        });
        this.authService.setUserName(null);
        admin.saveSubmission(this.auth.user).then(() => {
            this.auth.logout();
            this.authService.destroyRoles();
            this.router.navigate(['auth']);
        });
    }

}
