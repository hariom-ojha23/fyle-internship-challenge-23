import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserData } from 'src/app/shared/types/custom-types';
import { showErrorPopup, showWarningPopup } from 'src/app/utils/toast-mesage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonLabel: string = 'Search';
  placeholder: string = 'Enter Username';
  username: FormControl<string | null> = new FormControl('');

  recommendedUsers: UserData[] = [];
  searchedUser: UserData | null = null;

  loading: boolean = false;
  loadingCount: number[] = [1, 2, 3, 4, 5, 6];

  searching: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRecommenedeUsers();
  }

  fetchRecommenedeUsers(): void {
    this.loading = true;

    this.apiService.getRecommendedUserDetails().subscribe((data: UserData[]) => {
      this.recommendedUsers = data;
      this.loading = false;
    });
  }

  searchUsername(): void {
    let value: string | null = this.username.value;
    this.searching = true;
    this.searchedUser = null;

    if (!value || value.trim().length === 0) {
      showWarningPopup('Username is required!').then(() => {
        this.buttonLabel = 'Search';
        this.searching = false;
      });
    } else {
      this.buttonLabel = 'Searching...';

      this.apiService.getUser(value!!).subscribe(
        (res: UserData) => {
          this.searchedUser = res;
          this.buttonLabel = 'Search';
          this.searching = false;
        },
        (error: string) => {
          showErrorPopup(error).then(() => {
            this.searching = false;
            this.buttonLabel = 'Search';
          });
        }
      );
    }
  }
}
