import { Component, Input, OnInit, Inject } from '@angular/core';
import { FlickrPhoto } from '../../models/flickrPhoto';
import { FlickrOutput } from '../../models/flickrOutput';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.sass'],
})
export class FullscreenImageComponent implements OnInit {
  imageLoaded: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FullscreenImageComponent>
  ) {}

  ngOnInit(): void {
    const img = new Image();
    img.src = this.data.currentPhoto.url;
    img.onload = () => {
      this.imageLoaded = true;
    };
  }

  @Input() public photo: FlickrPhoto | null = null;

  onClose(): void {
    this.dialogRef.close(true);
  }
}
