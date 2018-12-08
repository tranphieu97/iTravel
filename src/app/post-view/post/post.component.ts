import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { ServerService } from 'src/app/core/services/server.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // local post receive data from server
  // it should has init data until receiving data from server so browser will not has error
  post: Post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], 0, '', [], '');
  postAuthorName = '';
  postCreateTime = '';
  private postId;

  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
      // check valid post Id or not
      if (this.postId.length !== 24) {
        // invalid => not-found
        this.router.navigate(['/not-found']);
      } else {
        this.serverService.getOnePost(this.postId).subscribe((resData) => {
          if (resData.data !== null && resData.data !== undefined) {
            this.post = resData.data;
            // convert data to string to show on view
            this.postCreateTime = this.post.approvedTime.getDay.toString();
          } else {
            this.router.navigate(['/not-found']);
          }
        });
      }
    });

    // this.postsSub = this.postService.postsUpdated.asObservable()
    //   .subscribe((posts: Post[]) => {
    //     this.post = posts[1];
    //   });
    // this.postService.getAllPosts();
  }
}
