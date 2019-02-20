import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitEmployeeResetPasswordComponent } from './submit-employee-reset-password.component';

describe('SubmitEmployeeResetPasswordComponent', () => {
  let component: SubmitEmployeeResetPasswordComponent;
  let fixture: ComponentFixture<SubmitEmployeeResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitEmployeeResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitEmployeeResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
