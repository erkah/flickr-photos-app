import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesSearchComponent implements OnInit {

  images: any[] = [];
  keyword: string = '';
  timeout: any = null;
  loading: boolean =  false;
  // @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;

  public currentPhoto: FlickrPhoto | null = null;
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };


  constructor(
    public dialog: MatDialog,
    private flickrService: FlickrService) { 
      // setTimeout(() => {
      //   this.viewPort.scrollToIndex(4999, 'auto');
      // },2000);
    }

  ngOnInit(): void {
  }

  search(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.keyword = event.target.value.toLowerCase();
        if ($this.keyword && $this.keyword.length > 0) {
          $this.loading = true;
          $this.flickrService.search_keyword($this.keyword)
          .pipe(tap(res => $this.images = res))
          .subscribe()
        }
      }
    }, 500);
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .pipe(tap(res => this.images = this.images.concat(res)))
      .subscribe()
    }
  }

  openDialog(currentPhoto: any): void {
    this.dialog.open(FullscreenImageComponent, {
      width: '1104px',
      height: '778px',
      panelClass: 'full-screen-modal',
      data: {
        currentPhoto: currentPhoto
      }
    });
  }

}
