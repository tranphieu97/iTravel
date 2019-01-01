import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { ServerService } from 'src/app/core/services/server.service';
import { PostRating } from 'src/app/model/post-rating.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-post-rating',
  templateUrl: './post-rating.component.html',
  styleUrls: ['./post-rating.component.scss']
})
export class PostRatingComponent implements OnInit {
  ratingArr = [0, 1, 2, 3, 4];
  postRatingNumber = 0;
  // received from outside
  @Input() post: Post;

  constructor(private serverService: ServerService, private userService: UserService) { }

  ngOnInit() {
    this.getPostRatingNumber();
  }

  onRated(rateNum: number) {
    // check login or not
    if (this.userService.isLogin && this.userService.currentUser._id.length === 24) {
      // filt out the old rating of curent user
      this.post.rating = this.post.rating.filter((eachEle) => {
        return eachEle.userId !== this.userService.currentUser._id;
      });
      // push the new rating
      this.post.rating.push(new PostRating(this.userService.currentUser._id, rateNum, new Date()));
      // update on client
      this.getPostRatingNumber();
      this.serverService.updatePostRating(this.post._id, this.post.rating).subscribe(() => {
        // update on client again
        this.getPostRatingNumber();
      });
    } else {
      // not have permission to rating
    }
  }

  getPostRatingNumber() {
    let sum = 0;
    for (const ratingItem of this.post.rating) {
      sum += ratingItem.ratingNumber;
    }
    this.postRatingNumber = sum / this.post.rating.length;
  }
}
