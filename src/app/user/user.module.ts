import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { UserPostManagementComponent } from './user-post-management/user-post-management.component';
import { PostViewModule } from '../post-view/post-view.module';
import { UserTourComponent } from './user-tour/user-tour.component';
import { ManagerModule } from '../manager/manager.module';
import { DetailModalComponent } from '../manager/tour-management/detail-modal/detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    PostViewModule,
    ManagerModule
  ],
  declarations: [UserProfileComponent, UserPostManagementComponent, UserTourComponent],
  entryComponents: [DetailModalComponent]
})
export class UserModule { }
