import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountServiceComponent } from './create-account-service.component';

describe('CreateAccountServiceComponent', () => {
  let component: CreateAccountServiceComponent;
  let fixture: ComponentFixture<CreateAccountServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
