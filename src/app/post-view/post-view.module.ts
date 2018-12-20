import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewRoutingModule } from './post-view-routing.module';
import { PostComponent } from './post-screen/post/post.component';
import { PostContentComponent } from './post-screen/post/post-content/post-content.component';
import { PostCommentComponent } from './post-screen/post/post-comment/post-comment.component';
import { PostRatingComponent } from './post-screen/post/post-rating/post-rating.component';
import { AddCommentComponent } from './post-screen/post/post-comment/add-comment/add-comment.component';
import { CommentItemComponent } from './post-screen/post/post-comment/comment-item/comment-item.component';
import { PostScreenComponent } from './post-screen/post-screen.component';

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
    CommentItemComponent,
    PostScreenComponent]
})
export class PostViewModule { }
