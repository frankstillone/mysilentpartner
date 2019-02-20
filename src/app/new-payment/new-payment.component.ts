import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';

@Component({
    selector: 'app-new-payment',
    templateUrl: './new-payment.component.html',
    styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

    accountId: any;
    directDebitType: boolean = false;
    cardType: boolean = false;
    paymentInformationForm: any;

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
        this.paymentInformationForm = this.fb.group({
            paymentMethod: [""],
            cardNumber: [""],
            month: [""],
            year: [""],
            bankName: [""],
            accountNumber: [""],
            bsb: [""]
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['service'];
        });
        let userNameFromService1 = this.accountId;
        setTimeout(function () {
            var userName = userNameFromService1;
            $('.formio-component-accountId input[name="data[accountId]"]').val(userName);
        }, 2000);
    }

    onChange(event) {
        if(event == "directDebit") {
            this.directDebitType = true;
            this.cardType = false;
        } else if(event == "visa/master") {
            this.cardType = true;
            this.directDebitType = false;
        }
    }

}
