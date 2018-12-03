import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJobEditorComponent } from './user-job-editor.component';

describe('UserJobEditorComponent', () => {
  let component: UserJobEditorComponent;
  let fixture: ComponentFixture<UserJobEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJobEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJobEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
