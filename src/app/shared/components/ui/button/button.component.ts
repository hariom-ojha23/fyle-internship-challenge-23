import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
 
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Label'
  @Input() color: string = 'primary'

  @Output() onClick = new EventEmitter()

  click = ($event: MouseEvent) => this.onClick.emit($event)
}
