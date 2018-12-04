import { Component, OnInit } from '@angular/core';
import { PostViewService } from 'src/app/post-view/post-view.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/core/services/constant.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  // local post receive data from service
  // it should has init data until receiving data from server so browser will not has error
  private post: Post = new Post(null, null, [], [], '', '', '', null, [], 0, '', [], '');
  // variable store Subscription for easy unSubscribe or subscribe again
  private postsSub: Subscription;

  constructor(private postService: PostViewService, private server: ServerService, private constant: ConstantService) { }

  ngOnInit() {
    this.postsSub = this.postService.postsUpdated.asObservable()
      .subscribe((posts: Post[]) => {
        this.post = posts[1];
        // console.log(this.post.location);
      });
    this.postService.getAllPosts();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.post.cover = reader.result.toString();
    // };
    // reader.readAsDataURL(file);

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
