import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VietNamMapComponent } from './viet-nam-map.component';

describe('VietNamMapComponent', () => {
  let component: VietNamMapComponent;
  let fixture: ComponentFixture<VietNamMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VietNamMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VietNamMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
