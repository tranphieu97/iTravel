import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostInformationComponent } from '../add-post/add-post-information/add-post-information.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AddPostInformationComponent]
})
export class AddPostModule { }
