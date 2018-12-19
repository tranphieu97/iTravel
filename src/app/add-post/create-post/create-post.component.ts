import { Component, OnInit } from '@angular/core';
import { PostViewService } from 'src/app/post-view/post-view.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';
import { Subscription, Subject, Observable } from 'rxjs';
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
  // variable store Observable uploadImgComplete
  private imageUploaded = 0;
  coverUploaded = false;

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
    // config reader to read file and show preview
    const reader = new FileReader();
    reader.onload = () => {
      this.post.cover = reader.result.toString();
    };
    reader.readAsDataURL(file);
    // store image temporary in newImages arra
    // this cover will be store on server when user click save
    this.coverFile = file;
    // line below only for test
    // this.uploadAllImage();
  }

  onSave() {
    // add cover to newImageFiles before upload all images to server
    this.newImageFiles.push({ imgFile: this.coverFile, contentId: 'cover' });
    this.serverService.uploadImage(this.newImageFiles).subscribe((resData) => {
      if (resData) {
        // update all images url before save
        this.newImageFiles.forEach((imageFileItem, index) => {
          // find true postContent has this image to update url
          const needUpdateImageUrl = this.post.postContents.find((eachEle) => {
            return eachEle._id === imageFileItem.contentId;
          });
          if (needUpdateImageUrl !== null && needUpdateImageUrl !== undefined) {
            needUpdateImageUrl.image = resData.imageUrls[index];
          }
        });
        // update cover url, that url located at the end of the array
        this.post.cover = resData.imageUrls[resData.imageUrls.length - 1];
        // save post, if id == '', => this is new post and need create new post
        // if id already exist, => this is old post and need update post
        if (this.postId === '') {
          // fix some default infomation for post
          this.post._id = null;
          // fix all post content_id = null
          for (const postContent of this.post.postContents) {
            postContent._id = null;
          }
          this.post.createdTime = new Date();
          this.post.approvedTime = null;
          // this.post.authorId
          this.post.rating = 0;
          this.post.status = this.constant.POST_STATUS.PENDING;
          this.serverService.postOnePost(this.post).subscribe(() => {
          });
        } else {
          // save edited post
        }
      } else {
        // can not get response
      }
    });
  }

  onDelImageClick() {
    this.post.cover = '';
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
