import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiService } from 'src/app/services/api.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { UserData } from 'src/app/shared/types/custom-types';
import { showErrorPopup, showWarningPopup } from 'src/app/utils/toast-mesage';
import { getRecommendedUsersMockData, getUserDetailsMockData, getUserMockData } from 'src/app/utils/test-data';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ComponentsModule, HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: 'showErrorPopup', useValue: showErrorPopup },
        { provide: 'showWarningPopup', useValue: showWarningPopup },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // get the ApiService instance from the TestBed
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // checking searchUsername method when username is correct
  it('should handle searchUsername method when value is provided', fakeAsync(() => {
    const username = 'hariom-ojha23';
    const user: UserData = {
      login: 'hariom-ojha23',
      avatar_url: 'https://avatars.githubusercontent.com/u/60937980?v=4',
      html_url: 'https://github.com/hariom-ojha23',
      name: 'Hari om ojha',
      blog: 'https://www.linkedin.com/in/hari-om-ojha-0ba62419b',
      bio: null,
      location: 'Mayur Vihar Phase1',
      followers: 2,
      following: 1,
      public_repos: 41,
    };

    // mock the getUser method for the username argument
    spyOn(apiService, 'getUser').withArgs(username).and.returnValue(of(user));

    component.username.setValue(username);
    fixture.detectChanges();

    // call searchUsername, which contains asynchronous code
    component.searchUsername();

    // use tick to simulate the passage of time
    tick();

    expect(apiService.getUser).toHaveBeenCalledWith(username);
    expect(component.searchedUser).toEqual(user);
  }));

  // checking if recommending users are fetching on initialization
  it('should fetch recommended users on initialization', fakeAsync(() => {
    const recommendedUsers: UserData[] = getUserDetailsMockData

    // mock the getRecommendedUserDetails method
    spyOn(apiService, 'getRecommendedUserDetails').and.returnValue(of(recommendedUsers));

    component.ngOnInit()

    expect(apiService.getRecommendedUserDetails).toHaveBeenCalled()
    expect(component.recommendedUsers).toEqual(recommendedUsers)
  }))

  // checking validateUserInput method
  it('should return true when value is not null and not empty', () => {
    const value = 'validValue';
    const result = component.validateUserInput(value);
    expect(result).toBe(true);
  });

 // checking validateUserInput method
  it('should return false when value is null', () => {
    const value = null;
    const result = component.validateUserInput(value);
    expect(result).toBe(false);
  });

   // checking validateUserInput method
  it('should return false when value is an empty string', () => {
    const value = '';
    const result = component.validateUserInput(value);
    expect(result).toBe(false);
  });

   // checking validateUserInput method
  it('should return false when value is a string with only whitespace', () => {
    const value = '   ';
    const result = component.validateUserInput(value);
    expect(result).toBe(false);
  });

   // checking placeholder value
  it('should have a placeholder set correctly', () => {
    expect(component.placeholder).toBe('Enter Username');
  });

  // checking if we have array of loading counts
  it('should have an array of loading counts', () => {
    expect(component.loadingCount).toEqual([1, 2, 3, 4, 5, 6]);
  });


  // testing tenmplates

  it('should render the input and button components', () => {
    const inputElement = fixture.nativeElement.querySelector('app-input');
    const buttonElement = fixture.nativeElement.querySelector('app-button');

    expect(inputElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
  });

  it('should trigger searchUsername when Enter is pressed', () => {
    spyOn(component, 'searchUsername');
  
    const inputElement = fixture.nativeElement.querySelector('app-input input');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);
  
    fixture.detectChanges();
  
    expect(component.searchUsername).toHaveBeenCalled();
  });

  it('should render skeleton loader while searching', () => {
    component.searching = true;
    fixture.detectChanges();

    const skeletonLoaderElement = fixture.nativeElement.querySelector('app-skeleton-loader');

    expect(skeletonLoaderElement).toBeTruthy();
  });

  it('should render user card when searchedUser is present', () => {
    component.searchedUser = getUserMockData;
    fixture.detectChanges();

    const userCardElement = fixture.nativeElement.querySelector('app-user-card');

    expect(userCardElement).toBeTruthy();
  });

  it('should render recommended user cards', () => {
    component.loading = false;
    component.recommendedUsers = getUserDetailsMockData;
    fixture.detectChanges();

    const userCardElements = fixture.nativeElement.querySelectorAll('app-user-card');

    expect(userCardElements.length).toEqual(component.recommendedUsers.length);
  });

});
