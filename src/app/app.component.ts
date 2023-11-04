import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe(console.log);
    this.apiService.getRepositories('hariom-ojha23').subscribe(console.log)
    this.apiService.getLanguages("krati-portfolio", "hariom-ojha23").subscribe(console.log)
  }
}
