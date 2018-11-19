import { Component, OnInit } from '@angular/core';
import { PostViewService } from '../post-view.service';
import { Post } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // local post receive data from server
  // it should has init data until receiving data from server so browser will not has error
  private post: Post = new Post(null, null, null, [], [], '', '', '', null, [], 0, '', [], '');
  // variable store Subscription for easy unSubscribe or subscribe again
  private postsSub: Subscription;

  constructor(private postService: PostViewService) { }

  ngOnInit() {
    // this.postService.addOnePost();
    // this.post = this.postService.getOnePosts('');
    this.postsSub = this.postService.postsUpdated.asObservable()
      .subscribe((posts: Post[]) => {
        this.post = posts[2];
      });
    this.postService.getAllPosts();
  }
}
