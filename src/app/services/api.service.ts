import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import {
  GetRecommendedUserApi,
  Repository,
  UserData,
} from '../shared/types/custom-types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  githubUrl: string = 'https://api.github.com';

  constructor(private httpClient: HttpClient) {}

  getUser(username: string): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.githubUrl}/users/${username}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getRepositories(
    username: string,
    page: number,
    limit: number
  ): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(
      `${this.githubUrl}/users/${username}/repos?page=${page}&per_page=${limit}`
    );
  }

  getLanguages(repositoryName: string, username: string): Observable<object> {
    return this.httpClient.get<object>(
      `${this.githubUrl}/repos/${username}/${repositoryName}/languages`
    );
  }

  getRecommendedUsers(): Observable<GetRecommendedUserApi[]> {
    let page = 1;
    let limit = 6;

    return this.httpClient.get<GetRecommendedUserApi[]>(
      `${this.githubUrl}/users?page=${page}&per_page=${limit}`
    )
  }

  getRecommendedUserDetails(): Observable<UserData[]> {
    return this.getRecommendedUsers().pipe(
      switchMap((data: GetRecommendedUserApi[]) => {
        const userLogins = data.map((user) => user.login);
        const details = userLogins.map((login) => this.getUser(login));
        return forkJoin(details);
      })
    );
  }
}
