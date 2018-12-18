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
  // array store new image need to upload to server
  newImageFiles: { imgFile: File, contentId: string }[] = [];
  coverFile: File = null;
  // variable store Subscription for easy unSubscribe or subscribe again
  // postsSub: Subscription;

  constructor(
    private postService: PostViewService,
    private serverService: ServerService,
    private constant: ConstantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // subscribe param change
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

    // subscribe when hasNewImage
    this.subscribeHasNewImage();
    // subscribe when hasImgDeleted
    this.subscribeHasImgDeleted();
  }

  // function subscribe when hasNewImage
  subscribeHasNewImage() {
    this.postService.hasNewImage.asObservable().subscribe(
      (newImageInfo: { imgFile: File, contentId: string }) => {
        // filt out old image file
        this.newImageFiles = this.newImageFiles.filter((eachEle) => {
          // only keep image of other postContent, remove image has deleted
          return eachEle.contentId !== newImageInfo.contentId;
        });
        // store temporary new image on newImages array
        // until user click "save", upload all to server
        this.newImageFiles.push(newImageInfo);
        // line below only for test
        // this.uploadAllImage();
        console.log(this.newImageFiles);
      });
  }

  // function subscribe when hasImgDeleted
  subscribeHasImgDeleted() {
    this.postService.hasImgDeleted.asObservable().subscribe((postContentId: string) => {
      this.newImageFiles = this.newImageFiles.filter((eachEle) => {
        // only keep image of other postContent, remove image has deleted
        return eachEle.contentId !== postContentId;
      });
      console.log(this.newImageFiles);
    });
  }

  onImagePicked(event: Event) {
    // get file of new image from event
    const file = (event.target as HTMLInputElement).files[0];
    // store image temporary in newImages arra
    this.coverFile = file;
    // this cover will be store on server when user click save

    // line below only for test
    // this.uploadAllImage();
  }

  /**
   * @description when user click save, go to upload all images in the new post include postCover
   * and many images in many postContents
   */
  uploadAllImage() {
    // first, upload cover
    if (this.coverFile !== null) {
      this.postService.uploadImage(this.coverFile).subscribe((resData) => {
        if (resData.imageUrl !== '') {
          // update cover url
          this.post.cover = resData.imageUrl;
        }
      });
    }

    // second, upload all image from all postContents in newImageFiles
    for (const item of this.newImageFiles) {
      this.postService.uploadImage(item.imgFile).subscribe((resData) => {
        if (resData.imageUrl !== '') {
          // find true postContent has this image to update url
          const needUpdateImageUrl = this.post.postContents.find((eachEle) => {
            return eachEle._id === item.contentId;
          });
          if (needUpdateImageUrl !== null && needUpdateImageUrl !== undefined) {
            // found the true postContent, go to update url
            needUpdateImageUrl.image = resData.imageUrl;
          }
        }
      });
    }
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
    // this.postService.getAllPosts();
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
