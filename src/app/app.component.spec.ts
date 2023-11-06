import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [ComponentsModule, HttpClientModule, AppRoutingModule, PagesModule, BrowserModule]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });
});
