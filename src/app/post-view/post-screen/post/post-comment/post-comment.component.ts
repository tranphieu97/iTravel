import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/core/services/post.service';
import { Comment } from 'src/app/model/comment.model';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() post: Post;

  constructor(private postService: PostService, private userService: UserService, private serverService: ServerService) { }

  ngOnInit() {
    this.postService.newComment.asObservable().subscribe((commentContent) => {
      // update on client
      this.post.comments.push(new Comment(this.userService.currentUser._id, new Date(), commentContent, 0, [], ''));
      // update on server
      this.serverService.updatePostComments(this.post._id, this.post.comments).subscribe(() => {
        // send comment success
      });
    });
  }

}
