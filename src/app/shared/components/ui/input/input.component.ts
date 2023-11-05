import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() placeholder: string = ''
  @Input() formControl: FormControl = new FormControl('')

  @Output() onPressEnter = new EventEmitter()

  emitEnterClick() {
    this.onPressEnter.emit()
  }
}
