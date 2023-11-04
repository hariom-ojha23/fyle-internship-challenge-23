import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

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

  getRepositories(githubUsername: string) {
    return this.httpClient.get(`${this.githubUrl}/users/${githubUsername}/repos`)
  }

  getLanguages(repositoryName: string, githubUsername: string) {
    return this.httpClient.get(`${this.githubUrl}/repos/${githubUsername}/${repositoryName}/languages`)
  }
}
