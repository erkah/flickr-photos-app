import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesCdkScrollComponent } from './images-cdk-scroll.component';

describe('ImagesCdkScrollComponent', () => {
  let component: ImagesCdkScrollComponent;
  let fixture: ComponentFixture<ImagesCdkScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagesCdkScrollComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesCdkScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
