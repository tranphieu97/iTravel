import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideToggleComponent } from './show-hide-toggle.component';

describe('ShowHideToggleComponent', () => {
  let component: ShowHideToggleComponent;
  let fixture: ComponentFixture<ShowHideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
