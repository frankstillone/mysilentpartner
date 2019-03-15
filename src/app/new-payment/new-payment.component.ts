import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormioAuthService } from 'angular-formio/auth';
import { Formio } from 'formiojs';
import { AppConfig } from '../config';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-new-payment',
    templateUrl: './new-payment.component.html',
    styleUrls: ['./new-payment.component.scss'],
    providers: [DatePipe]
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
    jbId: any;
    jbClientId: any;
    accountDetails: any;

    private formData = {}

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private http: Http, private auth: FormioAuthService, 
        private authService: AuthService, private router: Router, private datePipe: DatePipe) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.accountId = params['account'];
            this.formio = new Formio(this.appConfig.appUrl + '/accountpayment');
        });
    }

    ngOnInit() {
        this.formio.loadForm().then(form => (this.form = form));
        this.auth.ready.then(() => {
            this.getAccountDetails();
            this.currentUser = Formio.currentUser();
            this.showPaymentScreen = this.authService.showCustomerScreen;
        });
        const css = 'formio-alerts {display: none;}';
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }

    getAccountDetails(): void {
        this.loading = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("x-jwt-token", this.authService.getJwtToken());
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.appUrl + '/account/submission?_id=' + this.accountId, options).subscribe((res: any) => {
            let respon = res.json();
            this.accountDetails = respon[0];
            this.loading = false;
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
                this.jbId = respon.data.jbId;
                this.jbClientId = respon.data.jbClientId;
                if (submission.data.paymentType === "Credit Card") {
                    this.creditCardNumber = event.data.panel2CardNumber;
                    this.creditCardHolderName = submission.data.nameonCard;
                    submission.data.panel2CardNumber = submission.data.panel2CardNumber.toString().substr(submission.data.panel2CardNumber.toString().length - 4);
                    this.updateCreditCardPayment(submission);
                } else if (submission.data.paymentType === "Direct Debit") {
                    this.accountName = submission.data.accountName;
                    this.accountNumber = submission.data.panelAccountNumber;
                    this.bsb = submission.data.bsb;
                    this.bankName = submission.data.bankName;
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
            } else if (event.data.panel2CardNumber == '') {
                this.showAlertBox = true;
                this.alertMessage = "Please enter credit card number.";
                this.loading = false;
                return this.alertMessage;
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
            } else if (event.data.day == '') {
                this.showAlertBox = true;
                this.alertMessage = "Please enter expiry date.";
                this.loading = false;
                return this.alertMessage;
            }
            this.showAlertBox = false;
            this.alertMessage = "";
            return "success";
        } else {
            this.showAlertBox = false;
            this.alertMessage = "";
            return "success";
        }
    }

    updateCreditCardPayment(submission) {
        this.formData[this.appConfig.creditCardHolderName] = this.creditCardHolderName;
        this.formData[this.appConfig.creditCardNumber] = this.creditCardNumber;
        this.formData[this.appConfig.creditCardExpiry] = this.expiry;
        this.setPaymentFields(submission);
    }

    updateDirectDebitPayment(submission) {
        this.formData[this.appConfig.directDebitAccountName] = this.accountName;
        this.formData[this.appConfig.directDebitBankName] = this.bankName;
        this.formData[this.appConfig.directDebitAccountNumber] = this.accountNumber;
        this.formData[this.appConfig.directDebitAccountType] = "SAVINGS";
        this.formData[this.appConfig.directDebitBsb] = this.bsb;
        this.setPaymentFields(submission);
    }

    setPaymentFields(submission) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', this.appConfig.simpleBillingXAuthToken);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.appConfig.tspBilling + "/customer/" + this.jbId, options).subscribe((res: any) => {
            let responseFromTSP = res.json();
            this.formData["user.userId"] = this.jbId;
            this.formData["mainSubscription.periodId"] = responseFromTSP.mainSubscription.periodId;
            this.formData["user.entityId"] = responseFromTSP.entityId;
            this.formData["user.userName"] = responseFromTSP.userName;
            //this.formData[this.appConfig.customerEmailId] = "mayur.mamoria@gmail.com"; //To be asked
            this.formData["mainSubscription.nextInvoiceDayOfPeriod"] = responseFromTSP.mainSubscription.nextInvoiceDayOfPeriod;
            this.formData["user.accountTypeId"] = responseFromTSP.accountTypeId;
            this.formData["user.nextInvoiceDate"] = this.datePipe.transform(new Date(responseFromTSP.nextInvoiceDate), 'MM/dd/yyyy');
            this.formData["paymentMethod_0.processingOrder"] = "1";
            this.formData["modelIndex"] = "0";
            this.formData["paymentMethod_0.id"] = "";
            this.formData["paymentMethod_0.paymentMethodId"] = "";
            this.formData["currentIndex"] = "0";
            
            //Set Payment Method Type ID
            if (submission.data.paymentType === "Credit Card") {
                this.formData["paymentMethod_0.paymentMethodTypeId"] = "11";
            } else if (submission.data.paymentType === "Direct Debit") {
                this.formData["paymentMethod_0.paymentMethodTypeId"] = "13";
            }
       
            this.http.put(this.appConfig.tspBilling + '/customer/' + this.jbId, this.formData, options).subscribe((res: any) => {
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
        });
    }

}
