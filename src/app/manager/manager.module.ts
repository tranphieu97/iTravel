import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostManagementComponent } from './post-management/post-management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager.routing';
import { PostViewModule } from '../post-view/post-view.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule,
    PostViewModule
  ],
  declarations: [PostManagementComponent]
})
export class ManagerModule { }
