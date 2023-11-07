import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  UserData,
  Repository,
  GetRecommendedUserApi,
} from '../shared/types/custom-types';
import {
  getLanguagesMockData,
  getRecommendedUsersMockData,
  getUserDetailsMockData,
  getUserMockData,
} from '../utils/test-data';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be valid github url', () => {
    expect(service.githubUrl).toBe('https://api.github.com');
  });

  it('should be valid token', () => {
    expect(service.token).toBe(environment.token)
  })

  it('should be valid authorization header', () => {
    const mockHeader = { Authorization: `token ${environment.token}` }
    expect(service.headers).toEqual(mockHeader);
  })

  describe('getUser', () => {
    it('should return a user', () => {
      const username = 'hariom-ojha23';
      const mockUser: UserData = getUserMockData;

      service.getUser(username).subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpTestingController.expectOne(
        `${service.githubUrl}/users/${username}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockUser);
    });
  });

  describe('getRepositories', () => {
    it('should return a list of repositories', () => {
      const username = 'testuser';
      const page = 1;
      const limit = 10;
      const mockRepositories: Repository[] = [];

      service
        .getRepositories(username, page, limit)
        .subscribe((repositories) => {
          expect(repositories).toEqual(mockRepositories);
        });

      const req = httpTestingController.expectOne(
        `${service.githubUrl}/users/${username}/repos?page=${page}&per_page=${limit}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockRepositories);
    });
  });

  describe('getLanguages', () => {
    it('should return a list of languages', () => {
      const username = 'brynary';
      const repositoryName = 'active_admin';
      const mockLanguages = getLanguagesMockData;

      service.getLanguages(repositoryName, username).subscribe((languages) => {
        expect(languages).toEqual(mockLanguages);
      });

      const req = httpTestingController.expectOne(
        `${service.githubUrl}/repos/${username}/${repositoryName}/languages`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockLanguages);
    });
  });

  describe('getRecommendedUsers', () => {
    it('should return a list of users', () => {
      const page = 1;
      const limit = 6;
      const mockRecommendedUsers: GetRecommendedUserApi[] =
        getRecommendedUsersMockData;

      service.getRecommendedUsers().subscribe((users) => {
        expect(users).toEqual(mockRecommendedUsers);
      });

      const req = httpTestingController.expectOne(
        `${service.githubUrl}/users?page=${page}&per_page=${limit}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockRecommendedUsers);
    });
  });

  describe('getRecommendedUserDetails', () => {
    it('should return a list of user details', () => {
      const page = 1;
      const limit = 6;
      const mockRecommendedUsers: GetRecommendedUserApi[] =
        getRecommendedUsersMockData;
      const mockUserDetails: UserData[] = getUserDetailsMockData;

      service.getRecommendedUsers().subscribe((users) => {
        expect(users).toEqual(mockRecommendedUsers);
      });

      const req = httpTestingController.expectOne(
        `${service.githubUrl}/users?page=${page}&per_page=${limit}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockRecommendedUsers);

      // test getUser for each recommended user
      mockRecommendedUsers.forEach((user, index) => {
        service.getUser(user.login).subscribe((userDetail) => {
          expect(userDetail).toEqual(mockUserDetails[index]);
        });

        const req = httpTestingController.expectOne(
          `${service.githubUrl}/users/${user.login}`
        );
        expect(req.request.method).toEqual('GET');
        req.flush(mockUserDetails[index]);
      });
    });
  });
});
