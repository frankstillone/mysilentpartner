import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config';
import * as $ from 'jquery';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    public appConfig = AppConfig;
    appUrl: any;

    constructor() { }

    ngOnInit() {
    }

}
