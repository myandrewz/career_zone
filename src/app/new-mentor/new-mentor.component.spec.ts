import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMentorComponent } from './new-mentor.component';

describe('NewMentorComponent', () => {
  let component: NewMentorComponent;
  let fixture: ComponentFixture<NewMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
