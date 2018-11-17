import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-rating',
  templateUrl: './post-rating.component.html',
  styleUrls: ['./post-rating.component.scss']
})
export class PostRatingComponent implements OnInit {
  ratingArr = [0, 1, 2, 3, 4];
  // received from outside
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

  onRated() {
    console.log('onRated click');
  }
}
