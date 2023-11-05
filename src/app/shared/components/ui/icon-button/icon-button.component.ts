import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() disabled: boolean = false
  @Input() type: string = ''

  @Output() onClick = new EventEmitter()

  click($event: MouseEvent) {
    this.onClick.emit($event)
  }
}
