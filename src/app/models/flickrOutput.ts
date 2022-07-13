
import { FlickrPhoto } from './flickrPhoto';

export interface FlickrOutput {
    photos: {
      photo: FlickrPhoto[];
    };
}