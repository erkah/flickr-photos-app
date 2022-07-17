import { Component, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, takeUntil, throttleTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SearchedImages } from 'src/app/models/searchedImages';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

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

  private _unsubscribeAll: Subject<any>;

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.onScroll();
        });
      });
  }

  // loads images
  onScroll() {
    this.fetchMore.emit();
  }

  // opens full screen mode image
  opendialog(currentImage: SearchedImages) {
    this.openDialog.emit(currentImage);
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
