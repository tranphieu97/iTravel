import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostInformationComponent } from './add-post-information.component';

describe('AddPostInformationComponent', () => {
  let component: AddPostInformationComponent;
  let fixture: ComponentFixture<AddPostInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
