import { Component, OnInit, Input } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Post } from 'src/app/model/post.model';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem: Comment;
  commentAuthorName = '';
  creationTimeString = '';

  constructor() { }

  ngOnInit() {
    this.getCommentAuthorName();
    this.getCommentCreationTimeString();
    console.log(this.commentItem);
  }

  getCommentAuthorName() {
    if (this.commentItem.userId === null || this.commentItem.userId === undefined || this.commentItem.userId === '') {
      this.commentAuthorName = 'MyComment';
    } else {
      this.commentAuthorName = this.commentItem.userId;
    }
  }

  getCommentCreationTimeString() {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const tempDate = new Date(this.commentItem.creationTime);
    this.creationTimeString = tempDate.toLocaleString('vi-VI', options);
    // this.creationTimeString = tempDate.toLocaleString('en-US', options);
  }
}
