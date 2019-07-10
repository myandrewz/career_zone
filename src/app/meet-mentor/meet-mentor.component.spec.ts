import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetMentorComponent } from './meet-mentor.component';

describe('MeetMentorComponent', () => {
  let component: MeetMentorComponent;
  let fixture: ComponentFixture<MeetMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
