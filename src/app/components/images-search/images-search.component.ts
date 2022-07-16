import { ChangeDetectionStrategy, Component, OnInit,ViewChild} from '@angular/core';
import { tap } from 'rxjs/operators';
import { FlickrPhoto } from 'src/app/models/flickrPhoto';
import { FlickrService } from '../../services/flickr.service';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SearchedImages } from 'src/app/models/searchedImages';

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

  constructor(
    public dialog: MatDialog, 
    private flickrService: FlickrService
  ) {}

  ngOnInit(): void {}

  toggle(e: MatSlideToggleChange) {
    this.isChecked = e.source.checked;
  }

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

  fetchMore() {
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
}
