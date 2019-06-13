import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  commentAuthorAvatar = '';
  compLanguage;

  constructor(private userService: UserService, private postService: PostService, private languageService: LanguageService) { }

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.pagePostView;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.pagePostView)
    );
    this.getCommentAuthorAvatar();
  }

  onSendComment(commentElement: HTMLTextAreaElement) {
    const commentContent = commentElement.value;
    // if textarea empty but user click add comment => ignore
    if (commentContent.length > 0) {
      // validate comment maxlength
      if (commentContent.length <= 200) {
        this.postService.newComment.next(commentContent);
      } else {
        alert('Can not send comment too long');
      }
    }
    // reset textarea
    commentElement.value = '';
  }

  getCommentAuthorAvatar() {
    if (this.userService.currentUser.avatar === '' || this.userService.currentUser.avatar === null
      || this.userService.currentUser.avatar === undefined) {
      this.commentAuthorAvatar = 'assets/img/icons8-male-user-96.png';
    } else {
      this.commentAuthorAvatar = this.userService.currentUser.avatar;
    }
  }
}
