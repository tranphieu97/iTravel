import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { UserPostManagementComponent } from './user-post-management/user-post-management.component';
import { PostViewModule } from '../post-view/post-view.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    PostViewModule
  ],
  declarations: [UserProfileComponent, UserPostManagementComponent]
})
export class UserModule { }
