import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {
  @Input() shape: string = 'square';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() margin: string = '2px';

  constructor() { }

  ngOnInit(): void {
  }
}
