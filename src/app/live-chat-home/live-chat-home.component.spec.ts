import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChatHomeComponent } from './live-chat-home.component';

describe('LiveChatHomeComponent', () => {
  let component: LiveChatHomeComponent;
  let fixture: ComponentFixture<LiveChatHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveChatHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
