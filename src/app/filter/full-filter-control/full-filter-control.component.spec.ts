import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFilterControlComponent } from './full-filter-control.component';

describe('FullFilterControlComponent', () => {
  let component: FullFilterControlComponent;
  let fixture: ComponentFixture<FullFilterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFilterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
