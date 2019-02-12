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
    userName: any;
    localRoleId: any;

    constructor() { }

    setGlobalRole(parameterisedRoleId: any) {
        if (parameterisedRoleId) {
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

    setRoleId(localRoleId: any) {
        if(!localRoleId) {
            this.localRoleId = JSON.parse(localStorage.getItem("formioUser"));
            if(this.localRoleId) {
                this.localRoleId = this.localRoleId.roles[0];
            }
        } else {
            this.localRoleId = localRoleId;
        }
    }

    getRoleId() {
        return this.localRoleId;
    }

    getJwtToken() {
        return localStorage.getItem("formioToken");
    }

    setUserName(userName: any) {
        if(!userName) {
            this.userName = JSON.parse(localStorage.getItem("formioUser"));
            if(this.userName) {
                this.userName = this.userName.data.userName;
            }
        } else {
            this.userName = userName;
        }
    }

    getUserName() {
        return this.userName;
    }

    destroyRoles() {
        this.roleIs = "";
        this.showAdminScreen = false;
        this.showCustomerScreen = false;
        this.showEmployeeScreen = false;
        this.showOperatorScreen = false;
    }

}