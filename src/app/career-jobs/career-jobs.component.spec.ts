import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerJobsComponent } from './career-jobs.component';

describe('CareerJobsComponent', () => {
  let component: CareerJobsComponent;
  let fixture: ComponentFixture<CareerJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
