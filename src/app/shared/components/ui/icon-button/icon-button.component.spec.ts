import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconButtonComponent],
      imports: [MaterialModule]
    });
    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
