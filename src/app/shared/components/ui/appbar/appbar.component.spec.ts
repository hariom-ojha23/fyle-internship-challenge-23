import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarComponent } from './appbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

describe('AppbarComponent', () => {
  let component: AppbarComponent;
  let fixture: ComponentFixture<AppbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppbarComponent],
      imports: [MaterialModule]
    });
    fixture = TestBed.createComponent(AppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
