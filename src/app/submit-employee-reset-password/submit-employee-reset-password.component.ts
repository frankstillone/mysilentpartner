import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import { Router } from '@angular/router';
import { Formio } from 'formiojs';
import { FormioAuthService } from 'angular-formio/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-submit-employee-reset-password',
  templateUrl: './submit-employee-reset-password.component.html',
  styleUrls: ['./submit-employee-reset-password.component.scss']
})
export class SubmitEmployeeResetPasswordComponent implements OnInit {

    public appConfig = AppConfig;
    resetPasswordForm: any;
    formio: any;
    public form: any;

    constructor(public auth: FormioAuthService, private router: Router, private authService: AuthService) {
        this.formio = new Formio(this.appConfig.appUrl + '/employeeresetpassword');
    }
    
    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
    }

    onSubmit(submission: any) {
        const employee = new Formio(this.appConfig.appUrl + '/employee/submission/' + this.auth.user._id);
        this.auth.user.data.password = submission.data.newPassword;
        this.authService.setRoleId(null);
        this.authService.setGlobalRole(null);
        this.authService.setUserName(null);
        employee.saveSubmission(this.auth.user).then(() => {
            this.router.navigate(['/employeeHome']);
        });
    }

}
