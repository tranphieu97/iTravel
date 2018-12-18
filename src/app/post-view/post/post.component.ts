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
  postAuthorName = '';
  postCreateTime = '';
  @Input() postId: string;

  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
      this.getPostByPostId();
    });
  }

  ngOnChanges() {
    // if id of post changed, navigate to the post has that id
    if (this.postId !== this.post._id) {
      this.router.navigate(['/view-post', this.postId]);
    }
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
            // convert data to string to show on view
            // this.postCreateTime = this.post.approvedTime.getDay.toString();
          } else {
            this.router.navigate(['/not-found']);
          }
        });
      }
    }
  }
}
