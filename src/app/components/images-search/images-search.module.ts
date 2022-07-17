import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { ImagesSearchComponent } from './images-search.component';
import { ImagesCdkScrollComponent } from './images-cdk-scroll/images-cdk-scroll.component';
import { ImagesInfiniteScrollComponent } from './images-infinite-scroll/images-infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent, 
    ImagesSearchComponent, 
    ImagesCdkScrollComponent,
    ImagesInfiniteScrollComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
