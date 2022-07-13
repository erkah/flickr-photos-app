import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FlickrService } from '../../services/flickr.service';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.sass']
})
export class ImagesSearchComponent implements OnInit {

  images: any[] = [];
  keyword: string = '';

  constructor(private flickrService: FlickrService) { }

  ngOnInit(): void {
  }

  search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .pipe(tap(res => this.images = res))
      .subscribe()
    }
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .pipe(tap(res => this.images = this.images.concat(res)))
      .subscribe()
    }
  }

}
