import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserData } from 'src/app/shared/types/custom-types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: UserData | undefined
  loading = false

  constructor(
    private apiService: ApiService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUrlParam();
  }

  getUrlParam() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let username = params.get('username');
      if (username) this.getUserData(username)
    });
  }

  getUserData(username: string) {
    this.loading = true

    this.apiService.getUser(username).subscribe((data: UserData) => {
      this.userData = data
      this.loading = false
    })
  }
}
