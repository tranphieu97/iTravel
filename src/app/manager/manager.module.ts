import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostManagementComponent } from './post-management/post-management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule
  ],
  declarations: [PostManagementComponent]
})
export class ManagerModule { }
