import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCardViewPostComponent } from './horizontal-card-view-post.component';

describe('HorizontalCardViewPostComponent', () => {
  let component: HorizontalCardViewPostComponent;
  let fixture: ComponentFixture<HorizontalCardViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalCardViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalCardViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
