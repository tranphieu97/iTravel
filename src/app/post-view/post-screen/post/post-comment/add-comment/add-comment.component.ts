import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor(private serverService: ServerService, private postService: PostService) { }

  ngOnInit() {
  }

  onSendComment(commentElement: HTMLTextAreaElement) {
    const commentContent = commentElement.value;
    if (commentContent.length > 0) {
      this.postService.newComment.next(commentContent);
    }
    // reset textarea
    commentElement.value = '';
  }
}
