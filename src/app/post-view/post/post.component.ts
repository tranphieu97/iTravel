import { Component, OnInit } from '@angular/core';
import { PostViewService } from '../post-view.service';
import { Post } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';
import { ServerService } from 'src/app/core/services/server.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // local post receive data from server
  // it should has init data until receiving data from server so browser will not has error
  private post: Post = new Post(null, null, [], [], '', '', '', null, [], 0, '', [], '');
  private postId;

  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
    });
    this.serverService.getOnePost(this.postId).subscribe((resData) => {
      if (resData.data !== null && resData.data !== undefined) {
        this.post = resData.data;
      } else {
        this.router.navigate(['/not-found']);
      }
    });
    // this.postsSub = this.postService.postsUpdated.asObservable()
    //   .subscribe((posts: Post[]) => {
    //     this.post = posts[1];
    //   });
    // this.postService.getAllPosts();
  }
}
