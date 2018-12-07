import { Component, OnInit } from '@angular/core';
import { PostViewService } from 'src/app/post-view/post-view.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/core/services/constant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  // local post receive data from service
  // it should has init data until receiving data from server so browser will not has error
  post: Post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], 0, '', [], '');
  // if postId == '' => create new post
  // if postId != '' => edit post
  postId = '';
  // variable store Subscription for easy unSubscribe or subscribe again
  // postsSub: Subscription;

  constructor(
    private postService: PostViewService,
    private serverService: ServerService,
    private constant: ConstantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // check empty param or not
      if (params['id'] !== undefined) {
        this.postId = params['id'];
      }
      // check valid post Id or not
      if (this.postId.length !== 24) {
        if (this.postId === '') {
          // if id === '', component load as create new post
        } else {
          // invalid Id => not-found
          this.router.navigate(['/not-found']);
        }
      } else {
        this.serverService.getOnePost(this.postId).subscribe((resData) => {
          if (resData.data !== null && resData.data !== undefined) {
            this.post = resData.data;
          } else {
            this.router.navigate(['/not-found']);
          }
        });
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.postService.uploadImage(file).subscribe((resData) => {
      if (resData.imageUrl !== '') {
        this.post.cover = resData.imageUrl;
      }
    });
  }

  onDelImageClick() {
    this.post.cover = '';
  }

  onSave() {
    if (this.postId === '') {
      // fix some default infomation for post
      this.post._id = null;
      this.post.createdTime = new Date();
      this.post.approvedTime = null;
      // this.post.authorId
      this.post.rating = 0;
      this.post.status = this.constant.POST_STATUS.NEW;
      this.postService.addOnePost(this.post).subscribe((resData) => {
        //
      });
    } else {
      // save edited post
    }
  }

  onCancel() {
    this.postService.getAllPosts();
  }

  onUpdateTitle(event: Event) {
    // validate here
    this.post.title = (event.target as HTMLInputElement).value;
  }

  onUpdateDescription(event: Event) {
    // validate here
    this.post.description = (event.target as HTMLTextAreaElement).value;
  }
}
