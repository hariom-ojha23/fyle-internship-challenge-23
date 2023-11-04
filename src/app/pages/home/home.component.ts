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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRecommenedeUsers();
  }

  fetchRecommenedeUsers(): void {
    this.apiService.getRecommendedUserDetails().subscribe((res: any) => {
      this.recommendedUsers = res;
    });
  }

  SearchUsername(): void {
    let value = this.username.value;

    if (!value || value.trim().length === 0) {
      showWarningPopup('Username is required!').then(
        () => (this.buttonLabel = 'Search')
      );
    } else {
      this.buttonLabel = 'Searching...';

      this.apiService.getUser(value!!).subscribe((res: any) => {
        this.searchedUser = res;
      });
  
      this.buttonLabel = 'Search';
    }
  }
}
