import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';
import { AppConfig } from '../config';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-new-payment',
    templateUrl: './new-payment.component.html',
    styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

    showPaymentScreen: boolean = false;
    accountId: any;
    public appConfig = AppConfig;
    directDebitType: boolean = false;
    cardType: boolean = false;
    paymentInformationForm: any;
    formio: any;
    public form: any;
    currentUser: any;
    accountObject: any;
    alertMessage: any;
    showAlertBox: Boolean = false;
    showSuccessAlertBox: Boolean = false;
    private creditCardNumber: any;
    private expiry: any;
    private creditCardHolderName: any;
    private bankName: any;
    private accountName: any;
    private accountNumber: any;
    private bsb: any;
    loading: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private http: Http, private auth: FormioAuthService, private authService: AuthService, private router: Router) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['account'];
            this.formio = new Formio(this.appConfig.appUrl + '/accountpayment');
        });
    }

    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
        this.auth.ready.then(() => {
            this.currentUser = Formio.currentUser();
            this.showPaymentScreen = this.authService.showCustomerScreen;
        });
    }

    onSubmit(event: any) {
        this.loading = true;
        let validationString = this.checkValidations(event);
        if (validationString === 'success') {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append("x-jwt-token", this.authService.getJwtToken());
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.appConfig.appUrl + '/account/submission/' + this.accountId, options).subscribe((res: any) => {
                let respon = res.json();
                const submission = event;
                submission.data.account = respon;
                this.creditCardHolderName = submission.data.nameonCard;
                this.creditCardNumber = event.data.panel2CardNumber;
                if (submission.data.paymentType == 'Credit Card') {
                    submission.data.panel2CardNumber = submission.data.panel2CardNumber.toString().substr(submission.data.panel2CardNumber.toString().length - 4);
                }

                if (submission.data.paymentType === "Credit Card") {
                    this.updateCreditCardPayment(submission);
                } else if (submission.data.paymentType === "Direct Debit") {
                    this.updateDirectDebitPayment(submission);
                }
            });
        } else {
            this.loading = false;
        }
    }

    checkValidations(event: any) {
        if (event.data.paymentType == 'Credit Card') {
            if (event.data.panel2CardNumber) {
                if (event.data.panel2CardNumber.toString().length < '13' && event.data.panel2CardNumber.toString().length > '19') {
                    this.showAlertBox = true;
                    this.alertMessage = "Please enter valid credit card number.";
                    this.loading = false;
                    return this.alertMessage;
                }
            }
            if (event.data.day) {
                let month = event.data.day.substr(0, event.data.day.indexOf('/'));
                var parts = event.data.day.split("/");
                let year = parts[parts.length - 1];
                this.expiry = month + '/' + year;
                let dateString = year + '-' + month + '-' + '28T00:00:00';
                let newDate = new Date(dateString);
                if (newDate < new Date()) {
                    this.showAlertBox = true;
                    this.alertMessage = "Please enter valid expiry date.";
                    this.loading = false;
                    return this.alertMessage;
                }
            }
        }
        this.showAlertBox = false;
        this.alertMessage = "";
        return "success";
    }

    updateCreditCardPayment(submission) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', 'a53b87d4-eb38-4362-b4f9-5283c61b6047');
        let options = new RequestOptions({ headers: headers });
        let formData = {
            "user.userId": "11502",
            "mainSubscription.periodId": "2",
            "user.entityId": "1",
            "user.userName": "New Siltent User",
            "metaField_720.value": "test1@test.com",
            "mainSubscription.nextInvoiceDayOfPeriod": "1",
            "user.accountTypeId": "173",
            "user.nextInvoiceDate": "03/01/2019",
            "paymentMethod_0.paymentMethodTypeId": "1",
            "paymentMethod_0.processingOrder": "1",
            "0_metaField_95.value": this.creditCardHolderName,
            "0_metaField_96.value": Number(this.creditCardNumber),
            "0_metaField_97.value": this.expiry,
            "modelIndex": "0",
            "paymentMethod_0.id": "",
            "paymentMethod_0.paymentMethodId": "",
            "currentIndex": "0"
        }
        this.http.put('https://simplebilling.in:8443/customer/11502', formData, options).subscribe((res: any) => {
            this.showSuccessAlertBox = true;
            this.alertMessage = "";
            this.alertMessage = "Payment Updated Successfully";
            var createPayment = new Formio(this.appConfig.appUrl + '/accountpaymentinformation/submission');
            createPayment.saveSubmission(submission).then((created) => {
                this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
                this.loading = false;
            });
        }, (error : any) => {
            this.alertMessage = "";
            this.alertMessage = JSON.parse(error._body).message;
            this.showAlertBox = true;
            this.loading = false;
        });
    }

    updateDirectDebitPayment(submission) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', 'a53b87d4-eb38-4362-b4f9-5283c61b6047');
        let options = new RequestOptions({ headers: headers });
        let formData = {
            "user.userId": "11502",
            "mainSubscription.periodId": "2",
            "user.entityId": "1",
            "user.userName": "New Siltent User",
            "metaField_720.value": "test1@test.com",
            "mainSubscription.nextInvoiceDayOfPeriod": "1",
            "user.accountTypeId": "173",
            "user.nextInvoiceDate": "03/01/2019",
            "paymentMethod_0.paymentMethodTypeId": "1",
            "paymentMethod_0.processingOrder": "1",
            "0_metaField_95.value": this.creditCardHolderName,
            "0_metaField_96.value": Number(this.creditCardNumber),
            "0_metaField_97.value": this.expiry,
            "modelIndex": "0",
            "paymentMethod_0.id": "",
            "paymentMethod_0.paymentMethodId": "",
            "currentIndex": "0"
        }
        this.http.put('https://simplebilling.in:8443/customer/11502', formData, options).subscribe((res: any) => {
            this.showSuccessAlertBox = true;
            this.alertMessage = "";
            this.alertMessage = "Payment Updated Successfully";
            var updatePayment = new Formio(this.appConfig.appUrl + '/accountpaymentinformation/submission');
            updatePayment.saveSubmission(submission).then((updated) => {
                this.router.navigate(['customerServices'], { queryParams: { accountId: this.accountId } });
                this.loading = false;
            });
        }, (error : any) => {
            this.alertMessage = "";
            this.alertMessage = JSON.parse(error._body).message;
            this.showAlertBox = true;
            this.loading = false;
        });
    }

}
