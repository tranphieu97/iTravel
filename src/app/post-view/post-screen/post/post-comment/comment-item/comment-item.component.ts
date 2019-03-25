import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private serverService: ServerService, public userService: UserService, private postService: PostService) { }

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
    if (this.commentAuthorInfo) {
      // this.commentAuthorName = this.commentAuthorInfo.firstName + ' ' + this.commentAuthorInfo.lastName;
      if (this.commentAuthorInfo.firstName) {
        this.commentAuthorName += this.commentAuthorInfo.firstName;
      }
      if (this.commentAuthorInfo.lastName) {
        this.commentAuthorName += ' ' + this.commentAuthorInfo.lastName;
      }
    } else {
      this.commentAuthorName = 'Minh Thông';
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
      this.commentAuthorAvatar = 'assets/img/icons8-male-user-96.png';
    } else {
      this.commentAuthorAvatar = this.commentAuthorInfo.avatar;
    }
  }

  onLikeComment() {
    // update on client
    // always filtout the user from disliked list
    this.commentItem.userDisliked = this.commentItem.userDisliked.filter((eachEle) => {
      return eachEle !== this.userService.currentUser._id;
    });
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

  onDislikeComment() {
    // update on client
    // always filtout the user from liked list
    this.commentItem.userLiked = this.commentItem.userLiked.filter((eachEle) => {
      return eachEle !== this.userService.currentUser._id;
    });
    // find the user already disliked or not
    const duplicateId = this.commentItem.userDisliked.find((eachEle) => {
      return eachEle === this.userService.currentUser._id;
    });
    // if disliked already => toggle to not like by filtout the userId from list userLiked
    if (duplicateId) {
      this.commentItem.userDisliked = this.commentItem.userDisliked.filter((eachEle) => {
        return eachEle !== this.userService.currentUser._id;
      });
    } else {
      // if not like yet => go to like
      this.commentItem.userDisliked.push(this.userService.currentUser._id);
    }
    // update on server
    this.postService.newLike.next();
  }
}
