import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountServiceComponent } from './update-account-service.component';

describe('UpdateAccountServiceComponent', () => {
  let component: UpdateAccountServiceComponent;
  let fixture: ComponentFixture<UpdateAccountServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccountServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
