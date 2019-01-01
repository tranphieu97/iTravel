import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { ServerService } from 'src/app/core/services/server.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { UserService } from 'src/app/core/services/user.service';
import { ConstantService } from 'src/app/core/services/constant.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
  // local post receive data from server
  // it should has init data until receiving data from server so browser will not has error
  post: Post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], [], '', [], '');
  postAuthorName = 'Thong';
  postCreateTime = '';
  downloadPostCompleted = false;
  @Input() postId: string;

  constructor(private serverService: ServerService, private userService: UserService,
    private router: Router, private constant: ConstantService) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.postId = params['id'];
    //   this.getPostByPostId();
    // });
    this.getPostByPostId();
  }

  ngOnChanges() {

  }

  getPostByPostId() {

    // check valid post Id or not
    if (this.postId.length !== 24) {
      // invalid => not-found
      this.router.navigate(['/not-found']);
    } else {
      // check if id changed, go getOnePost to reload the post
      if (this.postId !== this.post._id) {
        this.serverService.getOnePost(this.postId).subscribe((resData) => {
          if (resData.data) {
            // validate post status, if not  approved => only admin and author can read
            if (resData.data.status !== this.constant.POST_STATUS.APPROVED) {
              // if user not admin and also not the author of post
              if (this.userService.currentUser.permission !== 'Admin' && this.userService.currentUser._id !== resData.data.authorId) {
                this.router.navigate(['/not-found']);
              }
            }
            this.post = resData.data;
            this.downloadPostCompleted = true;
            this.getPostAuthorName();
            this.getPostCreateTimeString();
          } else {
            this.router.navigate(['/not-found']);
          }
        });
      }
    }
  }

  onViewAuthorProfile() {
    // TODO
    // navigate to author profile
  }

  getPostAuthorName() {
    this.postAuthorName = 'Minh Thông';
  }

  getPostCreateTimeString() {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    // if approvedTime not null, use it to show on view
    if (this.post.approvedTime !== null) {
      const tempDate = new Date(this.post.approvedTime);
      this.postCreateTime = tempDate.toLocaleString('en-US', options);
    } else {
      // else use create time to show on view
      const tempDate = new Date(this.post.createdTime);
      this.postCreateTime = tempDate.toLocaleString('en-US', options);
    }
  }
}
