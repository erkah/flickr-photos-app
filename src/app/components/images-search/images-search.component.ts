import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { FlickrPhoto } from 'src/app/models/flickrPhoto';
import { FlickrService } from '../../services/flickr.service';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ImagesSearchComponent implements OnInit {
  images: any[] = [];
  keyword: string = '';
  timeout: any = null;
  loading: boolean = false;
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;

  public currentPhoto: FlickrPhoto | null = null;
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  constructor(public dialog: MatDialog, private flickrService: FlickrService) {}

  ngOnInit(): void {}

  search(event: any) {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(function () {
      $this.keyword = event.target.value.toLowerCase();
      if ($this.keyword && $this.keyword.length >= 3) {
        $this.loading = true;
        $this.flickrService
          .search_keyword($this.keyword)
          .pipe(tap((res) => {
            $this.images = res;
            $this.loading = false;
          }))
          .subscribe();
      }
    }, 1000);
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      const $this = this;
      this.loading = true;
      this.flickrService
        .search_keyword(this.keyword)
        .pipe(tap((res) => {
          this.images = this.images.concat(res);
          $this.loading = false;
        }))
        .subscribe();
    }
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
