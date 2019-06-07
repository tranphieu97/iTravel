import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerFeedbackComponent } from './reviewer-feedback.component';

describe('ReviewerFeedbackComponent', () => {
  let component: ReviewerFeedbackComponent;
  let fixture: ComponentFixture<ReviewerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
