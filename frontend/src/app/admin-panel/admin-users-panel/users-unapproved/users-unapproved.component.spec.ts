import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersUnapprovedComponent} from './users-unapproved.component';

describe('UsersUnapprovedComponent', () => {
    let component: UsersUnapprovedComponent;
    let fixture: ComponentFixture<UsersUnapprovedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersUnapprovedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersUnapprovedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
