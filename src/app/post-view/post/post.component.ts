import { Component, OnInit } from '@angular/core';
import { PostViewService } from '../post-view.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostViewService) { }

  ngOnInit() {
    // this.postService.addOnePost();
  }

}
