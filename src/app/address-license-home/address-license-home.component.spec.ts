import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLicenseHomeComponent } from './address-license-home.component';

describe('AddressLicenseHomeComponent', () => {
  let component: AddressLicenseHomeComponent;
  let fixture: ComponentFixture<AddressLicenseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressLicenseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressLicenseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
