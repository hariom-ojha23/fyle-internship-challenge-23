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

    this.apiService.getRecommendedUserDetails().subscribe({
      next: (data: UserData[]) => {
        this.recommendedUsers = data;
      },
      error: (error) => {
        showErrorPopup('Error fetching recommended users.\n' + error)
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    });
  }

  searchUsername(): void {
    this.searching = true;
    this.searchedUser = null;
    
    let value = this.username.value
    let isValid = this.validateUserInput(value)

    if (value && isValid) {
      this.buttonLabel = 'Searching...';

      this.apiService.getUser(value).subscribe({
        next: (data: UserData) =>  this.searchedUser = data,
        error: (error: any) => {
          showErrorPopup(error.message)
          this.searching = false;
          this.buttonLabel = 'Search';
        },
        complete: () => {
          this.searching = false;
          this.buttonLabel = 'Search';
        },
      });

    } else {
      showWarningPopup('Username is required!').then(() => {
        this.buttonLabel = 'Search';
        this.searching = false;
      });
    }
  }

  validateUserInput(value: string | null) {
    if ( value && value.trim().length !== 0) return true
    else return false
  }
}
