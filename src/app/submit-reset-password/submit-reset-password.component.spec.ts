import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitResetPasswordComponent } from './submit-reset-password.component';

describe('SubmitResetPasswordComponent', () => {
  let component: SubmitResetPasswordComponent;
  let fixture: ComponentFixture<SubmitResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
