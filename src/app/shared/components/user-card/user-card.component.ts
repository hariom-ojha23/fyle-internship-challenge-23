import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../types/custom-types';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: UserData | undefined

  constructor(
    @Inject(Router) private router: Router
  ) { }

  goToProfile(): void {
    if (this.user) this.router.navigateByUrl(`/users/${this.user.login}`)
  }
}
