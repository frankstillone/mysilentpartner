import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-update-payment',
    templateUrl: './update-payment.component.html',
    styleUrls: ['./update-payment.component.scss']
})
export class UpdatePaymentComponent implements OnInit {

    accountId: any;
    paymentId: any;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['service'];
            this.paymentId = params['id'];
        });
    }

    onSubmit(information) {
        console.log(information);
    }

}
