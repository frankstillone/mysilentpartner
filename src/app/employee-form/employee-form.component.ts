import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { FormioAuthService } from 'angular-formio/auth';

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

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showEmployeeScreen = this.authService.showEmployeeScreen;
            this.activatedRoute.queryParams.subscribe(params => {
                this.formPath = params['formPath'];
            });
        });
    }

}
