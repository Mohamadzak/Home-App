import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDPlannerComponent } from './three-d-planner.component';

describe('ThreeDPlannerComponent', () => {
  let component: ThreeDPlannerComponent;
  let fixture: ComponentFixture<ThreeDPlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeDPlannerComponent]
    });
    fixture = TestBed.createComponent(ThreeDPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
