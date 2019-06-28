import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesVideosComponent } from './images-videos.component';

describe('ImagesVideosComponent', () => {
  let component: ImagesVideosComponent;
  let fixture: ComponentFixture<ImagesVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
