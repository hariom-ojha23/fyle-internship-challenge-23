import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss']
})
export class UserCardsComponent {
  @Input() user: any

  constructor( private router: Router ) { }

  goToProfile(): void {
    this.router.navigateByUrl(`/users/${this.user.login}`)
  }
}
