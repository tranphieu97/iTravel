import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { UserPostManagementComponent } from './user-post-management/user-post-management.component';
import { PostViewModule } from '../post-view/post-view.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserTourComponent } from './user-tour/user-tour.component';
import { ToursModule } from '../tours/tours.module';
import { DetailModalComponent } from '../tours/tour-management/detail-modal/detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    PostViewModule,
    ToursModule
  ],
  declarations: [UserProfileComponent, UserPostManagementComponent, UserTourComponent, UpdateProfileComponent],
  entryComponents: [DetailModalComponent]
})
export class UserModule { }
