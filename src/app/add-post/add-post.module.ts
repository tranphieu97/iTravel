import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostInformationComponent } from '../add-post/add-post-information/add-post-information.component';
import { SharedModule } from '../shared/shared.module';
import { AddPostRoutingModule } from './add-post.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AddPostRoutingModule
  ],
  exports: [],
  declarations: [AddPostInformationComponent]
})
export class AddPostModule { }
