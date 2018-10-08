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
import { JobListComponent } from './job-list/job-list.component';
import { JobComponent } from './job/job.component';

@NgModule({
	declarations: [
		AppComponent,
		JobItemComponent,
		JobListComponent,
		JobComponent,
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
		MatCardModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
