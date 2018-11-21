import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDisplayComponent } from './job-display.component';

describe('JobDisplayComponent', () => {
  let component: JobDisplayComponent;
  let fixture: ComponentFixture<JobDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
