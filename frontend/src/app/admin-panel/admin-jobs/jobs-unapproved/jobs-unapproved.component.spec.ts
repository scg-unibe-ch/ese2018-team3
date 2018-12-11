import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobsUnapprovedComponent} from './jobs-unapproved.component';

describe('JobsUnapprovedComponent', () => {
    let component: JobsUnapprovedComponent;
    let fixture: ComponentFixture<JobsUnapprovedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobsUnapprovedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobsUnapprovedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
