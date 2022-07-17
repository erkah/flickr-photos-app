import { ChangeDetectionStrategy, Component, OnInit,ViewChild} from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { FlickrPhoto } from 'src/app/models/flickrPhoto';
import { FlickrService } from '../../services/flickr.service';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SearchedImages } from 'src/app/models/searchedImages';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ImagesSearchComponent implements OnInit {

  images: SearchedImages[] = [];
  keyword: string = '';
  timeout: any = null;
  loading: boolean = false;
  public currentPhoto: FlickrPhoto | null = null;
  isChecked: boolean = true;
  viewMode: string = '';

  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  private _unsubscribeAll: Subject<any>;

  constructor(
    public dialog: MatDialog, 
    private flickrService: FlickrService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}

  /**
   * Toogles Infinite Scroll and CDK mode view
   * @param {MatSlideToggleChange} e
   */
  toggle(e: MatSlideToggleChange) {
    this.isChecked = e.source.checked;
  }

  /**
   * Calls flickr Api from flickrService to retrive the images that are searched 
   * @param {any} event
   */
  search(event: any) {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(function () {
      $this.keyword = event.target.value.toLowerCase();
      if ($this.keyword && $this.keyword.length >= 3) {
        $this.loading = true;
        $this.flickrService
          .search_keyword($this.keyword)
          .pipe(
            tap((res) => {
            $this.images = res;
            $this.loading = false;
            }),
            takeUntil($this._unsubscribeAll))
          .subscribe();
      }
    }, 1000);
  }

  /**
   * Recalls flickr api from flickrService to load more data
   */
  fetchMore() {
    if (this.keyword && this.keyword.length > 0) {
      const $this = this;
      this.loading = true;
      this.flickrService
        .search_keyword(this.keyword)
        .pipe(
          tap((res) => {
          this.images = this.images.concat(res);
          $this.loading = false;
          }),
          takeUntil(this._unsubscribeAll))
        .subscribe();
    }
  }

  /**
   * Opens Full Screen Mode
   * @param {SearchedImages} currentPhoto
   */
  openDialog(currentPhoto: SearchedImages): void {
    this.dialog.open(FullscreenImageComponent, {
      width: '1104px',
      height: '778px',
      panelClass: 'full-screen-modal',
      data: {
        currentPhoto: currentPhoto,
      },
    });
  }

  /**
   * On destroy
   */
   ngOnDestroy(): void
   {
       // Unsubscribe from all subscriptions
       this._unsubscribeAll.next();
       this._unsubscribeAll.complete();
   }
}
