import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { ImagesSearchComponent } from './images-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
