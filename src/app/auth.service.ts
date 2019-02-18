import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    roleId: any;
    localStorageRole: any;
    showCustomerScreen: any = false;
    showAdminScreen: any = false;
    showEmployeeScreen: any = false;
    showOperatorScreen: any = false;
    userName: any;
    localRoleId: any;

    constructor() { }

    setGlobalRole(roleIs: any) {
        if (roleIs.administrator) {
            this.showAdminScreen = true;
        } else if (roleIs.employee) {
            this.showEmployeeScreen = true;
        } else if (roleIs.operator) {
            this.showOperatorScreen = true;
        } else if (roleIs.customer) {
            this.showCustomerScreen = true;
        }
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
        this.showAdminScreen = false;
        this.showCustomerScreen = false;
        this.showEmployeeScreen = false;
        this.showOperatorScreen = false;
    }

}