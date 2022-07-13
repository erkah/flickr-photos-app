import { Component, Input, OnInit } from '@angular/core';
import { FlickrPhoto } from '../../models/flickrPhoto';
import { FlickrOutput } from '../../models/flickrOutput';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.sass']
})
export class FullscreenImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() public photo: FlickrPhoto | null = null;

}
