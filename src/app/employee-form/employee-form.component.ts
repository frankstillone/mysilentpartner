import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

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

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (this.authService.getGlobalRole() === this.authService.employee) {
            this.showEmployeeScreen = this.authService.showEmployeeScreen;
            this.activatedRoute.queryParams.subscribe(params => {
                this.formPath = params['formPath'];
            });
            let userNameFromService = this.authService.getUserName();
            setTimeout(function () {
                var userName = userNameFromService;
                $('input[name="data[employeeName]"]').val(userName).prop('disabled', true);
            }, 2000);
        } else {
            this.showEmployeeScreen = false;
        }
    }

}
