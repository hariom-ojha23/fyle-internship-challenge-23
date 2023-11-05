import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input() userData: any;

  repositories: any[] = [];
  loading: boolean = false
  page: number = 1;
  start: number = 1;
  limit: number = 10;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && !changes['userData'].firstChange) {
      if (this.userData) this.fetchAllRepositories(this.page);
    }
  }

  fetchAllRepositories(page: number) {
    let totalRepos = this.userData.public_repos;
    let limit = this.limit;

    this.loading = true

    this.apiService
      .getRepositories(this.userData.login, totalRepos, page, limit)
      .subscribe((res: any) => {
        this.repositories = res.results
        this.loading = false
      });
  }

  setPage(page: number): void {
    this.page = page;
    this.fetchAllRepositories(page);
  }

  setStart(start: number): void {
    this.start = start;
  }
}
