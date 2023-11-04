import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: any

  constructor( private router: Router ) { }

  goToProfile(): void {
    this.router.navigateByUrl(`/users/${this.user.login}`)
  }
}
