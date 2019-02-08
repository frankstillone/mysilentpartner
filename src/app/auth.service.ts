import { Injectable } from '@angular/core';
import { AppConfig } from './config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    roleId: any;
    localStorageRole: any;
    public appConfig = AppConfig;
    roleIs: any;
    customer: any = 'customer';
    admin: any = 'admin';
    operator: any = 'operator';
    employee: any = 'employee';
    showCustomerScreen: any = false;
    showAdminScreen: any = false;
    showEmployeeScreen: any = false;
    showOperatorScreen: any = false;

    constructor() { }

    setGlobalRole(parameterisedRoleId: any) {
        if(parameterisedRoleId) {
            this.roleId = parameterisedRoleId;
        } else if (localStorage.getItem("formioUser")) {
            this.localStorageRole = JSON.parse(localStorage.getItem("formioUser"));
            this.roleId = this.localStorageRole.roles[0];
        }
        if (this.roleId) {
            if (this.appConfig.adminRoleId === this.roleId) {
                this.roleIs = "admin";
                this.showAdminScreen = true;
            } else if (this.appConfig.employeeRoleId === this.roleId) {
                this.roleIs = "employee";
                this.showEmployeeScreen = true;
            } else if (this.appConfig.operatorRoleId === this.roleId) {
                this.roleIs = "operator";
                this.showOperatorScreen = true;
            } else if (this.appConfig.customerRoleId === this.roleId) {
                this.roleIs = "customer";
                this.showCustomerScreen = true;
            }
        } else {
            this.roleIs = "default";
        }
    }

    getGlobalRole() {
        return this.roleIs;
    }

}
