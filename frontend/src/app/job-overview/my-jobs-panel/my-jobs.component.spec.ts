import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobsPanelComponent } from './my-jobs-panel.component';

describe('MyJobsPanelComponent', () => {
  let component: MyJobsPanelComponent;
  let fixture: ComponentFixture<MyJobsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
