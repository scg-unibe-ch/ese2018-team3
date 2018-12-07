import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminJobEditorComponent} from './admin-job-editor.component';

describe('AdminJobEditorComponent', () => {
    let component: AdminJobEditorComponent;
    let fixture: ComponentFixture<AdminJobEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminJobEditorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminJobEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
