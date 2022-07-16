import { Component, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SearchedImages } from 'src/app/models/searchedImages';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'images-cdk-scroll',
  templateUrl: './images-cdk-scroll.component.html',
  styleUrls: ['./images-cdk-scroll.component.sass'],
})
export class ImagesCdkScrollComponent implements OnInit {
  @Input() images: SearchedImages[] = [];
  @Input() loading: boolean = false;
  @Input() keyword: string = '';
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  @Output() fetchMore: EventEmitter<any> = new EventEmitter();
  @Output() openDialog: EventEmitter<any> = new EventEmitter();

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onScroll();
  }

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.onScroll();
        });
      });
  }

  onScroll() {
    this.fetchMore.emit();
  }

  opendialog(currentImage: SearchedImages) {
    this.openDialog.emit(currentImage);
  }

}
