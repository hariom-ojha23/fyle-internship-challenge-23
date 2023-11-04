import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
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
    this.apiService.getUser(username).subscribe((res: any) => {
      this.userData = res
    })
  }
}
