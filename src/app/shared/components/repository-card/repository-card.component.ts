import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent implements OnInit {
  @Input() repository: any

  languages: any[] = []
  loading: boolean = false

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void { this.fetchLanguages() }

  fetchLanguages() {
    let repo = this.repository
    this.loading = true

    this.apiService.getLanguages(repo.name, repo.owner.login).subscribe((res: any) => {
      this.languages = Object.keys(res)
      this.loading = false
    })
  }

}
