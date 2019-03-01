import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

    showEmployeeScreen: boolean = false;
    public appConfig = AppConfig;
    loading: boolean = false;
    formPath: any;
    formio: any;
    public form: any;
    currentUser: any;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private auth: FormioAuthService, private router: Router) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.formPath = params['formPath'];
            this.formio = new Formio(this.appConfig.appUrl + '/' + this.formPath);
        });
    }

    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
        this.auth.ready.then(() => {
            this.currentUser = Formio.currentUser();
            this.showEmployeeScreen = this.authService.showEmployeeScreen;
        });
    }

    onSubmit(event) {
        this.loading = true;
        const eventI = event;
        eventI.data.empId = Formio.currentUser().__zone_symbol__value._id;
        eventI.data.employeeId = Formio.currentUser().__zone_symbol__value;
        this.formio.saveSubmission(eventI).then((created) => {
           this.loading = false;
           this.router.navigate(['employeeHome'], { });
        });
    }

}
