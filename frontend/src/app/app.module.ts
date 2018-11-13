import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Add css components from angular material
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule
} from '@angular/material';
import { FormsModule  } from '@angular/forms';
import { JobItemComponent } from './job-item/job-item.component';
import { AboutComponent} from './about/about.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobComponent } from './job/job.component';
import { AppRoutingModule } from './/app-routing.module';
import { JobOverviewComponent } from './job-overview/job-overview.component';

@NgModule({
	declarations: [
		AppComponent,
		JobItemComponent,
    AboutComponent,
		JobListComponent,
		JobComponent,
		JobOverviewComponent,
	],
	imports: [
		MatDatepickerModule,
		MatNativeDateModule,
		MatMenuModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatListModule,
		MatInputModule,
		MatCheckboxModule,
		MatCardModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
