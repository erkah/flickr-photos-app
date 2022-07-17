import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { SearchedImages } from 'src/app/models/searchedImages';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'images-infinite-scroll',
  templateUrl: './images-infinite-scroll.component.html',
  styleUrls: ['./images-infinite-scroll.component.sass']
})
export class ImagesInfiniteScrollComponent implements OnInit {

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  @Input() images: SearchedImages[] = [];
  @Input() loading: boolean = false;
  @Input() keyword: string = '';
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;
  @Output() fetchMore: EventEmitter<any> = new EventEmitter();
  @Output() openDialog: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  // loads images
  onScroll() {
    this.fetchMore.emit();
  }

  // opens full screen mode image
  opendialog(currentImage: SearchedImages) {
    this.openDialog.emit(currentImage);
  }

}
