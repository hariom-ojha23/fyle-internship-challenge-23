import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import {
  GetRecommendedUserApi,
  Repository,
  UserData,
} from '../shared/types/custom-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  githubUrl: string = environment.githubUrl;
  token: string = environment.token

  headers = { Authorization: `token ${this.token}` }

  constructor(private httpClient: HttpClient) {}

  getUser(username: string): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.githubUrl}/users/${username}`, { headers: this.headers });
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getRepositories(
    username: string,
    page: number,
    limit: number
  ): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(
      `${this.githubUrl}/users/${username}/repos?page=${page}&per_page=${limit}`,
      { headers: this.headers }
    );
  }

  getLanguages(repositoryName: string, username: string): Observable<object> {
    return this.httpClient.get<object>(
      `${this.githubUrl}/repos/${username}/${repositoryName}/languages`, 
      { headers: this.headers }
    );
  }

  getRecommendedUsers(): Observable<GetRecommendedUserApi[]> {
    let page = 1;
    let limit = 6;

    return this.httpClient.get<GetRecommendedUserApi[]>(
      `${this.githubUrl}/users?page=${page}&per_page=${limit}`,
      { headers: this.headers }
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
