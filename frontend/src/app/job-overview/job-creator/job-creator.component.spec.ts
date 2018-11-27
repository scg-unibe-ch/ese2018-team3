import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreatorComponent } from './job-creator.component';

describe('JobCreatorComponent', () => {
  let component: JobCreatorComponent;
  let fixture: ComponentFixture<JobCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
