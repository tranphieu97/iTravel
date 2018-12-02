import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbyRegionComponent } from './filterby-region.component';

describe('FilterbyRegionComponent', () => {
  let component: FilterbyRegionComponent;
  let fixture: ComponentFixture<FilterbyRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterbyRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterbyRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
