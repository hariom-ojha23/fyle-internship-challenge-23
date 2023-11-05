import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../../types/custom-types';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() userData: UserData | undefined
  @Input() loading: boolean = false
}
