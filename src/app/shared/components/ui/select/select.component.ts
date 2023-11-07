import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() defaultValue: number =  10
  @Input() options: number[] = []

  @Output() onSelect = new EventEmitter()

  onSelectChange(event: MatSelectChange) {
    this.onSelect.emit(event.value)
  }
}
