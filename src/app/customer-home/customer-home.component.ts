import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-customer-home',
    templateUrl: './customer-home.component.html',
    styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {

    showCustomerScreen: boolean = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        if (this.authService.getGlobalRole() === this.authService.customer) {
            this.showCustomerScreen = this.authService.showCustomerScreen;
        } else {
            this.showCustomerScreen = false;
        }
    }

}
