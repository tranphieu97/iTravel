import { Component, OnInit, Input } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Post } from 'src/app/model/post.model';
import { Comment } from 'src/app/model/comment.model';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem: Comment;
  commentAuthorInfo: { firstName: string, lastName: string, avatar: string };
  commentAuthorName = '';
  creationTimeString = '';
  commentAuthorAvatar = '';

  constructor(private serverService: ServerService, private userService: UserService, private postService: PostService) { }

  ngOnInit() {
    if (this.commentItem.userId !== undefined && this.commentItem.userId !== null) {
      this.serverService.getUserBasicInfo(this.commentItem.userId).subscribe((resData) => {
        if (resData) {
          this.commentAuthorInfo = resData.data;
          this.getCommentAuthorName();
          this.getCommentCreationTimeString();
          this.getAuthorAvatar();
        }
      });
    } else {
      this.getCommentAuthorName();
      this.getCommentCreationTimeString();
      this.getAuthorAvatar();
    }
  }

  getCommentAuthorName() {
    if (this.commentAuthorInfo !== null && this.commentAuthorInfo !== undefined) {
      this.commentAuthorName = this.commentAuthorInfo.firstName + ' ' + this.commentAuthorInfo.lastName;
    } else {
      this.commentAuthorName = 'MyComment';
    }
  }

  getCommentCreationTimeString() {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const tempDate = new Date(this.commentItem.creationTime);
    this.creationTimeString = tempDate.toLocaleString('vi-VI', options);
    // this.creationTimeString = tempDate.toLocaleString('en-US', options);
  }

  getAuthorAvatar() {
    if (this.commentAuthorInfo === undefined || this.commentAuthorInfo.avatar === '') {
      this.commentAuthorAvatar = 'assets/img/itravel.png';
    } else {
      this.commentAuthorAvatar = this.commentAuthorInfo.avatar;
    }
  }

  onLikeComment() {
    // update on client
    // find the user already liked or not
    const duplicateId = this.commentItem.userLiked.find((eachEle) => {
      return eachEle === this.userService.currentUser._id;
    });
    // if liked already => toggle to not like by filtout the userId from list userLiked
    if (duplicateId) {
      this.commentItem.userLiked = this.commentItem.userLiked.filter((eachEle) => {
        return eachEle !== this.userService.currentUser._id;
      });
    } else {
      // if not like yet => go to like
      this.commentItem.userLiked.push(this.userService.currentUser._id);
    }
    // update on server
    this.postService.newLike.next();
  }
}
