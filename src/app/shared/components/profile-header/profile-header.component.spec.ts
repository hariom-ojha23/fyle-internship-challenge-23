import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderComponent } from './profile-header.component';
import { ComponentsModule } from '../components.module';

describe('ProfileHeaderComponent', () => {
  let component: ProfileHeaderComponent;
  let fixture: ComponentFixture<ProfileHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileHeaderComponent],
      imports: [ComponentsModule]
    });
    fixture = TestBed.createComponent(ProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
