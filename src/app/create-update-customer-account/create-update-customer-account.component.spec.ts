import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCustomerAccountComponent } from './create-update-customer-account.component';

describe('CreateUpdateCustomerAccountComponent', () => {
  let component: CreateUpdateCustomerAccountComponent;
  let fixture: ComponentFixture<CreateUpdateCustomerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateCustomerAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCustomerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
