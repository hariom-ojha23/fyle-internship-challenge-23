import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  githubUrl: string = 'https://api.github.com'

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`${this.githubUrl}/users/${githubUsername}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 

  getRepositories(githubUsername: string, total: number, page: number, limit: number) {
    return this.httpClient.get(`${this.githubUrl}/users/${githubUsername}/repos?page=${page}&per_page=${limit}`)
  }

  getLanguages(repositoryName: string, githubUsername: string) {
    return this.httpClient.get(`${this.githubUrl}/repos/${githubUsername}/${repositoryName}/languages`)
  }

  getRecommendedUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.githubUrl}/users`)
  }

  getRecommendedUserDetails(): Observable<any[]> {
    return this.getRecommendedUsers().pipe(
      switchMap(data => {
        const userLogins = data.slice(4, 10).map(user => user.login);
        const details = userLogins.map(login => this.getUser(login));
        return forkJoin(details);
      })
    );
  }
}
