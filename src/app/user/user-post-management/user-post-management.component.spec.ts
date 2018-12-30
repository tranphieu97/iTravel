import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostManagementComponent } from './user-post-management.component';

describe('UserPostManagementComponent', () => {
  let component: UserPostManagementComponent;
  let fixture: ComponentFixture<UserPostManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
