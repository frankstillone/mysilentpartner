import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdminResetPasswordComponent } from './submit-admin-reset-password.component';

describe('SubmitAdminResetPasswordComponent', () => {
  let component: SubmitAdminResetPasswordComponent;
  let fixture: ComponentFixture<SubmitAdminResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAdminResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAdminResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
