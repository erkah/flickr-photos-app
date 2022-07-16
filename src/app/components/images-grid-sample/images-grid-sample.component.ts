import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';
import { tap, auditTime } from 'rxjs/operators';
@Component({
  selector: 'app-images-grid-sample',
  templateUrl: './images-grid-sample.component.html',
  styleUrls: ['./images-grid-sample.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesGridSampleComponent implements OnInit {
  arr = Array.from({ length: 20 }).map((_, i) => `${i}`);
  infinite = new BehaviorSubject<any[]>([]);
  itemSize = 200;

  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  ngOnInit() {}

  ngAfterViewInit() {
    this.viewPort.scrolledIndexChange
      .pipe(
        auditTime(300),
        tap((currIndex: number) => {
          console.log('scrolledIndexChange:', currIndex);
          this.nextBatch(currIndex, this.infinite.value);
        })
      )
      .subscribe();

    setTimeout(() => this.infinite.next(this.arr), 300);
  }

  getNextIndex(index: number) {
    return index >= this.arr.length ? index % this.arr.length : index;
  }

  getNextBatch(items: any[], currIndex: number, range: number) {
    const nextIndex = this.getNextIndex(currIndex + range);
    let chunk;
    if (currIndex >= this.arr.length) {
      const lastRange = currIndex + range - this.arr.length;
      const last = this.arr.slice(nextIndex, lastRange);
      const first = this.arr.slice(0, lastRange);
      chunk = [...first, ...last];
    } else {
      chunk = this.arr.slice(nextIndex, nextIndex + range);
    }
    return [...items, ...chunk];
  }

  nextBatch(currIndex: number, items: any[]) {
    console.log('here', items);
    const total = this.viewPort.getDataLength();

    this.arr.push('25');
    this.arr.push('26');
    console.log(this.arr.length, total);

    const buffer = Math.floor(this.viewPort.getViewportSize() / this.itemSize);
    if (total <= currIndex + buffer) {
      const state = this.getNextBatch(items, currIndex, buffer);
      this.infinite.next(state);
    }
  }

  trackByIdx(i: number) {
    return i;
  }
}
