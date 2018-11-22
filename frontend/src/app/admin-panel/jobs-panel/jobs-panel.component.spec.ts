import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobsPanelComponent} from './jobs-panel.component';

describe('JobsPanelComponent', () => {
    let component: JobsPanelComponent;
    let fixture: ComponentFixture<JobsPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobsPanelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobsPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
