import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailProcessingHomeComponent } from './email-processing-home.component';

describe('EmailProcessingHomeComponent', () => {
  let component: EmailProcessingHomeComponent;
  let fixture: ComponentFixture<EmailProcessingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailProcessingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailProcessingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
