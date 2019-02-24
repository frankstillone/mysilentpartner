import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCustomerResetPasswordComponent } from './submit-customer-reset-password.component';

describe('SubmitCustomerResetPasswordComponent', () => {
  let component: SubmitCustomerResetPasswordComponent;
  let fixture: ComponentFixture<SubmitCustomerResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCustomerResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCustomerResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
