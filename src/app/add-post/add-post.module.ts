import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostInformationComponent } from '../add-post/add-post-information/add-post-information.component';
import { SharedModule } from '../shared/shared.module';
import { AddPostRoutingModule } from './add-post.routing';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateTagComponent } from './create-post/create-tag/create-tag.component';
import { CreatePostContentComponent } from './create-post/create-post-content/create-post-content.component';
import { CreateLocationComponent } from './create-post/create-location/create-location.component';
import { CreateCategoryComponent } from './create-post/create-category/create-category.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AddPostRoutingModule
  ],
  exports: [],
  declarations: [AddPostInformationComponent, CreatePostComponent, CreateTagComponent, CreatePostContentComponent, CreateLocationComponent, CreateCategoryComponent]
})
export class AddPostModule { }
