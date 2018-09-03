import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SampleComponent } from './sample/sample.component';
import { HttpClientModule } from '@angular/common/http';

//Add css components from angular material
import {MatButtonModule, MatListModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
