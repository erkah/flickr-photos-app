import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesGridSampleComponent } from './images-grid-sample.component';

describe('ImagesGridSampleComponent', () => {
  let component: ImagesGridSampleComponent;
  let fixture: ComponentFixture<ImagesGridSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesGridSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesGridSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
