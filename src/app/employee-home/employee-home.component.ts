import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from '../config';

@Component({
    selector: 'app-employee-home',
    templateUrl: './employee-home.component.html',
    styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {
    
    showEmployeeScreen: boolean = false;
    public appConfig = AppConfig;
    loading: boolean = false;
    availableForms: any;

    constructor(private authService: AuthService, private http: Http) { }

    ngOnInit() {
        if (this.authService.showEmployeeScreen) {
            this.showEmployeeScreen = this.authService.showEmployeeScreen;
            this.getAccountDetails();
        } else {
            this.showEmployeeScreen = false;
        }
    }

    getAccountDetails(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append("x-jwt-token", this.authService.getJwtToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/form?type=form&limit=50&submissionAccess.roles=' + this.authService.getRoleId(), options).subscribe((res: any) => {
            let respon = res.json();
            this.availableForms = respon;
            this.loading = false;
        });
    }
}
