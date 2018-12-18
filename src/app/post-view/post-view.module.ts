import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostContentComponent } from './post/post-content/post-content.component';
import { PostCommentComponent } from './post/post-comment/post-comment.component';
import { PostViewRoutingModule } from './post-view-routing.module';
import { PostRatingComponent } from './post/post-rating/post-rating.component';
import { AddCommentComponent } from './post/post-comment/add-comment/add-comment.component';
import { CommentItemComponent } from './post/post-comment/comment-item/comment-item.component';

@NgModule({
  imports: [
    CommonModule,
    PostViewRoutingModule
  ],
  exports: [PostComponent],
  declarations: [
    PostComponent,
    PostContentComponent,
    PostCommentComponent,
    PostRatingComponent,
    AddCommentComponent,
    CommentItemComponent]
})
export class PostViewModule { }
