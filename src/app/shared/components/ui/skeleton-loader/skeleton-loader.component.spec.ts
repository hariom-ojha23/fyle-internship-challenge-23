import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoaderComponent } from './skeleton-loader.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('SkeletonLoaderComponent', () => {
  let component: SkeletonLoaderComponent;
  let fixture: ComponentFixture<SkeletonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonLoaderComponent],
      imports: [MaterialModule, NgxSkeletonLoaderModule]
    });
    fixture = TestBed.createComponent(SkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
