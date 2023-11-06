import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryCardComponent } from './repository-card.component';
import { ComponentsModule } from '../components.module';
import { HttpClientModule } from '@angular/common/http';

describe('RepositoryCardComponent', () => {
  let component: RepositoryCardComponent;
  let fixture: ComponentFixture<RepositoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryCardComponent],
      imports: [ComponentsModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(RepositoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
