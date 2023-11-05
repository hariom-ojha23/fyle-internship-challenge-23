import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { showWarningPopup } from 'src/app/utils/toast-mesage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonLabel: string = 'Search';
  placeholder: string = 'Enter Username';
  username: FormControl<string | null> = new FormControl('');
  recommendedUsers: any = [];
  searchedUser = null;

  loading: boolean = false
  loadingCount = [1,2,3,4,5,6]

  searching: boolean = false

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRecommenedeUsers();
  }

  fetchRecommenedeUsers(): void {
    this.loading = true

    this.apiService.getRecommendedUserDetails().subscribe((res: any) => {
      this.recommendedUsers = res;
      this.loading = false
    });
  }

  SearchUsername(): void {
    let value = this.username.value;
    this.searching = true
    this.searchedUser = null

    if (!value || value.trim().length === 0) {
      showWarningPopup('Username is required!').then(() => {
        this.buttonLabel = 'Search'
        this.searching = false
      });
    } else {
      this.buttonLabel = 'Searching...';

      this.apiService.getUser(value!!).subscribe((res: any) => {
        this.searchedUser = res;
        this.buttonLabel = 'Search';
        this.searching = false
      });
    }
  }
}
