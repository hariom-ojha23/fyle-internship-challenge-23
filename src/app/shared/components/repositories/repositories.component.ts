import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Repository, UserData } from '../../types/custom-types';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input() userData: UserData | undefined;

  repositories: Repository[] | null = null;
  loading: boolean = false;
  page: number = 1;
  start: number = 1;
  limit: number = 10;
  options: number[] = []

  loadingCount = [1,2,3,4,5,6]

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.setOptions()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && !changes['userData'].firstChange) {
      if (this.userData) this.fetchAllRepositories(this.page);
    }
  }

  fetchAllRepositories(page: number): void {
    if (!this.userData) return

    let limit = this.limit;
    this.loading = true;

    this.apiService
      .getRepositories(this.userData.login, page, limit)
      .subscribe((data: Repository[]) => {
        this.repositories = data;
        this.loading = false;
      });
  }

  setPage(page: number): void {
    this.page = page;
    this.fetchAllRepositories(page);
  }

  setStart(start: number): void {
    this.start = start;
  }

  getTotal() {
    let userData = this.userData;
    let limit = this.limit;

    if (!userData) return 0;

    let value: number = userData?.public_repos / 6;

    if (userData && userData.public_repos % limit !== 0) {
      value = Number(userData.public_repos / limit) + 1;
    }

    return value;
  }

  setOptions() {
    for (let i = 1; i <= 100; i++) {
      this.options.push(i)
    }
  }

  onChangeLimit(value: number) {
    this.limit = value

    if (this.userData) this.fetchAllRepositories(this.page)
  }
}
