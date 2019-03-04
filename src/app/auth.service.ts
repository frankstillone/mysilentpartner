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
    firstAndLastName: any;
    userRoleType: any;

    constructor() { }

    setGlobalRole(roleIs: any) {
        if (roleIs.adminl1) {
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
            this.localRoleId = JSON.parse(localStorage.getItem("formioAppUser"));
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
            this.userName = JSON.parse(localStorage.getItem("formioAppUser"));
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

    setFirstAndLastName() {
        this.firstAndLastName = JSON.parse(localStorage.getItem("formioAppUser"));
        if(this.firstAndLastName) {
            this.firstAndLastName = this.firstAndLastName.data.firstName;
        }
    }

    getFirstAndLastName() {
        return this.firstAndLastName;
    }

    setUserRoleType() {
        this.userRoleType = JSON.parse(localStorage.getItem("formioAppUser"));
        if(this.userRoleType) {
            this.userRoleType = this.userRoleType.data.roleType;
        }
    }

    getUserRoleType() {
        return this.userRoleType;
    }

    destroyRoles() {
        this.showAdminScreen = false;
        this.showCustomerScreen = false;
        this.showEmployeeScreen = false;
        this.showOperatorScreen = false;
    }

}
