import { Component, OnInit } from '@angular/core';
import { PostViewService } from '../post-view.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private postService: PostViewService) { }

  ngOnInit() {
    // this.postService.addOnePost();
    this.post = this.postService.getOnePosts('');
    console.log(this.post);
  }

}
