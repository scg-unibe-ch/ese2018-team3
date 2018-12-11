import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobsChangedComponent} from './jobs-changed.component';

describe('JobsChangedComponent', () => {
    let component: JobsChangedComponent;
    let fixture: ComponentFixture<JobsChangedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobsChangedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobsChangedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
