import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ImagesSearchComponent } from './components/images-search/images-search.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FullscreenImageComponent } from './components/fullscreen-image/fullscreen-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImagesGridComponent } from './components/images-grid/images-grid.component';
import { ImagesGridSampleComponent } from './components/images-grid-sample/images-grid-sample.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesSearchComponent,
    FullscreenImageComponent,
    ImagesGridComponent,
    ImagesGridSampleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxMasonryModule,
    MatProgressSpinnerModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
