import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesInfiniteScrollComponent } from './images-infinite-scroll.component';

describe('ImagesInfiniteScrollComponent', () => {
  let component: ImagesInfiniteScrollComponent;
  let fixture: ComponentFixture<ImagesInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesInfiniteScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
