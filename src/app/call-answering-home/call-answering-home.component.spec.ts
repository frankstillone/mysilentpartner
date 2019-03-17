import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallAnsweringHomeComponent } from './call-answering-home.component';

describe('CallAnsweringHomeComponent', () => {
  let component: CallAnsweringHomeComponent;
  let fixture: ComponentFixture<CallAnsweringHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallAnsweringHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallAnsweringHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
