import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FlickrPhoto } from '../models/flickrPhoto';
import { FlickrOutput } from '../models/flickrOutput';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  prevKeyword: string = '';
  currPage = 1;

  constructor(private http: HttpClient) {}

  /**
   * Retrives all images from Flickr API based on the keyword added
   * @param {string} keyword
   */
  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=20&page=${this.currPage}`;

    return this.http.get<FlickrOutput>(url + params).pipe(
      map((res: FlickrOutput) => {
        const urlArr: any[] = [];

        res.photos.photo.forEach((photo: FlickrPhoto) => {
          const photoObj = {
            thumbnail: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
            title: photo.title,
            owner: photo.owner,
          };
          urlArr.push(photoObj);
        });

        return urlArr;
      })
    );
  }
}
