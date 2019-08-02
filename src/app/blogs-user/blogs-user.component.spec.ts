import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsUserComponent } from './blogs-user.component';

describe('BlogsUserComponent', () => {
  let component: BlogsUserComponent;
  let fixture: ComponentFixture<BlogsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
