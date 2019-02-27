import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import { AppConfig } from '../config';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

    loading: boolean = false;
    showAdminScreen: boolean = false;
    public appConfig = AppConfig;

    constructor(private authService: AuthService, private http: Http, private activatedRoute: ActivatedRoute, private router: Router, public auth: FormioAuthService) { }

    ngOnInit() {
        this.auth.ready.then(() => {
            this.showAdminScreen = this.authService.showAdminScreen;
        });
    }

}
