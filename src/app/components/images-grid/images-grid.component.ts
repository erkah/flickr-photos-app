import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter, map, tap, pairwise, throttleTime } from 'rxjs/operators';
import { FlickrService } from 'src/app/services/flickr.service';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.sass'],
})
export class ImagesGridComponent implements OnInit {
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  infinite = new BehaviorSubject<any[]>([]);
  images: any[] = [];
  loading: boolean = false;
  @Input() keyword: string = '';

  constructor(
    private flickrService: FlickrService,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMore();
  }

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.fetchMore();
        });
      });
  }

  fetchMore(): void {
    this.loading = true;
    this.flickrService
      .search_keyword(this.keyword)
      .pipe(
        tap((res) => {
          this.images = this.images.concat(res);
          this.loading = false;
        })
      )
      .subscribe();
  }

  openDialog(currentPhoto: any): void {
    this.dialog.open(FullscreenImageComponent, {
      width: '1104px',
      height: '778px',
      panelClass: 'full-screen-modal',
      data: {
        currentPhoto: currentPhoto,
      },
    });
  }
}
