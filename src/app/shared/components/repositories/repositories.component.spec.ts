import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesComponent } from './repositories.component';
import { ComponentsModule } from '../components.module';
import { HttpClientModule } from '@angular/common/http';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoriesComponent],
      imports: [ComponentsModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
