import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() total: number = 1;
  @Input() start: number = 1;

  @Output() setPage = new EventEmitter()
  @Output() setStart = new EventEmitter()

  totalBox: number = 6
  range: number[] = []

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 768) this.setTotalBox(3);
    else this.setTotalBox(6);
  }

  ngOnInit(): void {
    this.onResize();
  }

  private setTotalBox(value: number) {
    this.totalBox = value;
  }

  boxRange(start: number) {
    const arr = []
    const end = start + this.totalBox - 1

    for (let i = start; i <= end; i++) {
      if (i <= this.total) {
          arr.push(i)
      }
    }

    return arr
  }

  onPressNext = () => {
    let newValue = this.start + this.totalBox
    this.setStart.emit(newValue)
  }
  
  onPressPrev = () => {
    let newValue = this.start - this.totalBox
    this.setStart.emit(newValue)
  }

  emitSetPage(value: number) {
    this.setPage.emit(value)
  }
}
