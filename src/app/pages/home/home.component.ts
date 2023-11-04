import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { showWarningPopup } from 'src/app/utils/toast-mesage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  buttonLabel = 'Search';

  placeholder = 'Enter Username';
  username = new FormControl('');

  constructor(private apiService: ApiService) {}

  SearchUsername() {
    this.buttonLabel = 'Searching...';

    let value = this.username.value;

    if (value && value.trim().length !== 0) {
      this.apiService.getUser(value).subscribe(console.log);
      this.buttonLabel = 'Search';
    } else {
      showWarningPopup('Username is required!').then(
        () => (this.buttonLabel = 'Search')
      );
    }
  }
}
