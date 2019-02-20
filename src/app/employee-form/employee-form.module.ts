import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormioResource, FormioResourceRoutes, FormioResourceConfig, FormioResourceService } from 'angular-formio/resource';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormioResource,
        RouterModule.forChild(FormioResourceRoutes())
    ],
    providers:[
        FormioResourceService,
        {
            provide: FormioResourceConfig, useValue: {
                parents: [
                    {
                        field: 'employee',
                        resource: 'currentUser'
                    }
                ]
            }
        }
    ]
})
export class EmployeeFormModule implements OnInit {
    ngOnInit() {
        console.log(1);
    }
}
