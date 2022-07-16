import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter, map, tap, pairwise, throttleTime } from 'rxjs/operators';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesGridComponent implements OnInit {
  // @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  infinite = new BehaviorSubject<any[]>([]);
  images: any[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  loading: boolean = false;

  constructor(private flickrService: FlickrService) {}

  ngOnInit(): void {}

  ngAfterInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        console.log('herjsjjs');
        this.flickrService
          .search_keyword('hello')
          .pipe(tap((res) => (this.images = this.images.concat(res))))
          .subscribe();
      });
  }

  // getNewData(currentIndex: number) {
  //   const end = this.viewport.getRenderedRange().end;
  //   console.log('here33', end, currentIndex);
  //   if (currentIndex + 5 >= end) {
  //     this.images.push('20', '21', '22', '23');
  //     console.log('do new request');
  //   }
  // }

  fetchMore(): void {}
}
