import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FlickrPhoto } from 'src/app/models/flickrPhoto';
import { FlickrService } from '../../services/flickr.service';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.sass']
})
export class ImagesSearchComponent implements OnInit {

  images: any[] = [];
  keyword: string = '';
  timeout: any = null;

  public currentPhoto: FlickrPhoto | null = null;
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;

  constructor(
    public dialog: MatDialog,
    private flickrService: FlickrService) { }

  ngOnInit(): void {
  }

  search(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.keyword = event.target.value.toLowerCase();
        if ($this.keyword && $this.keyword.length > 0) {
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

  openDialog(): void {
    this.dialog.open(FullscreenImageComponent, {
      data: {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'full-screen-modal'
      }
    });
  }

}
