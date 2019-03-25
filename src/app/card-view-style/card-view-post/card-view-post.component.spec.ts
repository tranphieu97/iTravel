import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewPostComponent } from './card-view-post.component';

describe('CardViewPostComponent', () => {
  let component: CardViewPostComponent;
  let fixture: ComponentFixture<CardViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
