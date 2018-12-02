import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobOverviewComponent} from './job-offers.component';

describe('JobOffersComponent', () => {
    let component: JobOverviewComponent;
    let fixture: ComponentFixture<JobOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobOverviewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
