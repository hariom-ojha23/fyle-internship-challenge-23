import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Output() onClick = new EventEmitter()

  click($event: MouseEvent) {
    this.onClick.emit($event)
  }
}
