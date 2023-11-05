import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() next: number = 1;
  @Input() previous: number = 1;
  @Input() total: number = 1;
  @Input() start: number = 1;

  @Output() setPage = new EventEmitter()
  @Output() setStart = new EventEmitter()
}
