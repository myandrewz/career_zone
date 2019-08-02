import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsRequestComponent } from './mentors-request.component';

describe('MentorsRequestComponent', () => {
  let component: MentorsRequestComponent;
  let fixture: ComponentFixture<MentorsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
