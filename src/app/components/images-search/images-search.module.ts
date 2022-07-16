import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { ImagesSearchComponent } from './images-search.component';
import { ImagesGridComponent } from '../images-grid/images-grid.component';

@NgModule({
  declarations: [AppComponent, ImagesSearchComponent, ImagesGridComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
