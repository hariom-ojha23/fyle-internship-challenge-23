import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  githubUrl: string = 'https://api.github.com';
  token = '';

  constructor(private httpClient: HttpClient) { }

  getUser(username: string) {
    return this.httpClient.get(`${this.githubUrl}/users/${username}`, { headers: this.headers });
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  headers = { Authorization: `token ${this.token}` }

  getRepositories(
    username: string,
    total: number,
    page: number,
    limit: number
  ) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

    if (endIndex < total) {
      results.next = { page: page + 1, limit: limit };
    }

    if (startIndex > 0) {
      results.previous = { page: page - 1, limit: limit };
    }

    return this.httpClient
      .get(
        `${this.githubUrl}/users/${username}/repos?page=${page}&per_page=${limit}`, { headers: this.headers }
      )
      .pipe(map((data) => ({ ...results, results: data })));
  }

  getLanguages(repositoryName: string, username: string) {
    return this.httpClient.get(
      `${this.githubUrl}/repos/${username}/${repositoryName}/languages`, { headers: this.headers }
    );
  }

  getRecommendedUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.githubUrl}/users`, { headers: this.headers });
  }

  getRecommendedUserDetails(): Observable<any[]> {
    return this.getRecommendedUsers().pipe(
      switchMap((data) => {
        const userLogins = data.slice(4, 10).map((user) => user.login);
        const details = userLogins.map((login) => this.getUser(login));
        return forkJoin(details);
      })
    );
  }
}
