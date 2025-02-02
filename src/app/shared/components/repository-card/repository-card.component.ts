import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Repository } from '../../types/custom-types';
import { showErrorPopup } from 'src/app/utils/toast-mesage';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent implements OnInit {
  @Input() repository: Repository | undefined

  languages: string[] = []
  loading: boolean = false

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void { this.fetchLanguages() }

  fetchLanguages(): void {
    let repo = this.repository
    this.loading = true

    if (!repo) return

    this.apiService.getLanguages(repo.name, repo.owner.login).subscribe({
      next: (data: object) => {
        this.languages = Object.keys(data)
      },
      complete: () => {
        this.loading = false
      }
    })
  }
}
