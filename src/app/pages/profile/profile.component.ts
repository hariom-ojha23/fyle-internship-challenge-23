import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any
  loading = false

  constructor(
    private apiService: ApiService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUrlParam();
  }

  getUrlParam() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let username = params.get('username');
      if (username) this.getUserData(username)
    });
  }

  getUserData(username: string) {
    this.loading = true

    this.apiService.getUser(username).subscribe((res: any) => {
      this.userData = res
      this.loading = false
    })
  }
}
