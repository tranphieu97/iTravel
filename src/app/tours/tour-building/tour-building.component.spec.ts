import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBuildingComponent } from './tour-building.component';

describe('TourBuildingComponent', () => {
  let component: TourBuildingComponent;
  let fixture: ComponentFixture<TourBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
