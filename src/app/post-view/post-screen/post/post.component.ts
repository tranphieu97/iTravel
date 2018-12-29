import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { ServerService } from 'src/app/core/services/server.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
  // local post receive data from server
  // it should has init data until receiving data from server so browser will not has error
  post: Post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], 0, '', [], '');
  postAuthorName = 'Thong';
  postCreateTime = '';
  downloadPostCompleted = false;
  @Input() postId: string;

  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }

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
          if (resData.data !== null && resData.data !== undefined) {
            this.post = resData.data;
            this.downloadPostCompleted = true;
            // convert some data to string to show on view
            // console.log(this.post.status);
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
