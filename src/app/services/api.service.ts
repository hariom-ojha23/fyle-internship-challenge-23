import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Repository, UserData } from '../shared/types/custom-types';

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

  getLanguages(repositoryName: string, username: string): Observable<string[]> {
    return this.httpClient
      .get<string[]>(
        `${this.githubUrl}/repos/${username}/${repositoryName}/languages`,
      )
      .pipe(map((data: Object) => Object.keys(data)));
  }

  getRecommendedUsers(): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(`${this.githubUrl}/users`);
  }

  getRecommendedUserDetails(): Observable<UserData[]> {
    return this.getRecommendedUsers().pipe(
      switchMap((data: UserData[]) => {
        const userLogins = data.slice(4, 10).map((user) => user.login);
        const details = userLogins.map((login) => this.getUser(login));
        return forkJoin(details);
      })
    );
  }
}

