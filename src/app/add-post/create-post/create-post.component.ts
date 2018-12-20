import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';
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
  // private imageUploaded = 0;
  // coverUploaded = false;
  // variable store alert
  alertContent = ``;
  // validate status of the whole post
  postIsValid = false;

  // all validate status
  validateObject = {
    // variable check valid or not foreach properties
    validateTitle: {
      maxLength: { status: false, message: 'Title can not be too long' },
      notEmpty: { status: false, message: 'Title can not be empty' }
    },
    validateDesc: {
      maxLength: { status: false, message: 'Description can not be too long' },
      notEmpty: { status: false, message: 'Description can not be empty' }
    },
    validateCover: {
      notEmpty: { status: false, message: 'Cover can not be empty' }
    },
    validateCategory: {
      notEmpty: { status: false, message: 'Category can not be empty' }
    },
    validateTag: {
      maxLength: { status: false, message: 'Each tag can not be too long' }
    },
    validatePlace: {
      maxLength: { status: false, message: 'Place can not be too long' },
      notEmpty: { status: false, message: 'Place can not be empty' }
    },
    validateAddress: {
      maxLength: { status: false, message: 'Address can not be too long' }
    },
    validateProvinceCity: {
      notEmpty: { status: false, message: 'Province-City can not be empty' }
    },
    validatePostContent: {
      notEmpty: { status: false, message: 'Post content can not be empty' }
    }
  };

  constructor(
    private postService: PostService,
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
    // subscribe when has new change and need validate
    this.postService.categoryChanged.asObservable().subscribe(() => {
      this.alertContent = this.validateCategory();
    });
    this.postService.placeChanged.asObservable().subscribe(() => {
      this.alertContent = this.validatePlace();
    });
    this.postService.provinceCityChanged.asObservable().subscribe(() => {
      this.alertContent = this.validateProvinceCity();
    });
    this.postService.addressChanged.asObservable().subscribe(() => {
      this.alertContent = this.validateAddress();
    });
    this.postService.newAlert.asObservable().subscribe((location: string[]) => {
      if (location.length >= 2) {
        this.alertContent = this.validateObject[location[0]][location[1]]['message'];
      }
    });
  }

  /**
   * @description function subscribe for hasNewImage
   * receive new image mean there may be an image be override
   * we need remove the old file and push the new ones
   */
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
    // go to validate all form
    this.validateAll();
    if (this.postIsValid === true) {
      // add cover to newImageFiles before upload all newImageFiles to server
      if (this.coverFile !== null && this.coverFile !== undefined) {
        this.newImageFiles.push({ imgFile: this.coverFile, contentId: 'cover' });
      }
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
    } else {
    }
  }

  onLeaveImgPicker() {
    this.alertContent = this.validateCover();
  }

  onDelImageClick() {
    this.post.cover = '';
    this.coverFile = null;
    this.alertContent = this.validateCover();
  }

  onCancel() {
    // this.postService.getAllPosts();
  }

  onUpdateTitle(event: Event) {
    // validate here
    this.post.title = (event.target as HTMLInputElement).value;
    this.alertContent = this.validateTitle();
  }

  onUpdateDescription(event: Event) {
    // validate here
    this.post.description = (event.target as HTMLTextAreaElement).value;
    this.alertContent = this.validateDescription();
  }

  validateAll() {
    this.alertContent = this.alertContent
      + this.validateTitle() + '\n'
      + this.validateDescription() + '\n'
      + this.validateCover() + '\n'
      + this.validateCategory() + '\n'
      + this.validatePlace() + '\n'
      + this.validateProvinceCity() + '\n'
      + this.validateAddress();
    this.alertContent = this.alertContent.replace(/\n+/g, '\n');
    this.alertContent = this.alertContent.trim();
    if (this.alertContent === '') {
      this.postIsValid = true;
    } else {
      this.postIsValid = false;
    }
  }

  validateTitle() {
    if (this.post.title.length <= 0) {
      this.validateObject.validateTitle.notEmpty.status = false;
      this.validateObject.validateTitle.maxLength.status = true;
      return this.validateObject.validateTitle.notEmpty.message;
    } else if (this.post.title.length > 200) {
      this.validateObject.validateTitle.notEmpty.status = true;
      this.validateObject.validateTitle.maxLength.status = false;
      return this.validateObject.validateTitle.maxLength.message;
    } else {
      this.validateObject.validateTitle.notEmpty.status = true;
      this.validateObject.validateTitle.maxLength.status = true;
      return '';
    }
  }

  validateDescription() {
    if (this.post.description.length <= 0) {
      this.validateObject.validateDesc.notEmpty.status = false;
      this.validateObject.validateDesc.maxLength.status = true;
      return this.validateObject.validateDesc.notEmpty.message;
    } else if (this.post.title.length > 500) {
      this.validateObject.validateDesc.notEmpty.status = true;
      this.validateObject.validateDesc.maxLength.status = false;
      return this.validateObject.validateDesc.maxLength.message;
    } else {
      this.validateObject.validateDesc.notEmpty.status = true;
      this.validateObject.validateDesc.maxLength.status = true;
      return '';
    }
  }

  validateCover() {
    if (this.coverFile === null || this.coverFile === undefined) {
      this.validateObject.validateCover.notEmpty.status = false;
      return this.validateObject.validateCover.notEmpty.message;
    } else {
      this.validateObject.validateCover.notEmpty.status = true;
      return '';
    }
  }

  validateCategory() {
    if (this.post.categories.length <= 0) {
      this.validateObject.validateCategory.notEmpty.status = false;
      return this.validateObject.validateCategory.notEmpty.message;
    } else {
      this.validateObject.validateCategory.notEmpty.status = true;
      return '';
    }
  }

  validatePlace() {
    if (this.post.location.locationName.length <= 0) {
      this.validateObject.validatePlace.notEmpty.status = false;
      this.validateObject.validatePlace.maxLength.status = true;
      return this.validateObject.validatePlace.notEmpty.message;
    } else if (this.post.location.locationName.length > 200) {
      this.validateObject.validatePlace.notEmpty.status = true;
      this.validateObject.validatePlace.maxLength.status = false;
      return this.validateObject.validatePlace.maxLength.message;
    } else {
      this.validateObject.validatePlace.notEmpty.status = true;
      this.validateObject.validatePlace.maxLength.status = true;
      return '';
    }
  }

  validateProvinceCity() {
    if (this.post.location.provinceCity.length <= 0) {
      this.validateObject.validateProvinceCity.notEmpty.status = false;
      return this.validateObject.validateProvinceCity.notEmpty.message;
    } else {
      this.validateObject.validateProvinceCity.notEmpty.status = true;
      return '';
    }
  }

  validateAddress() {
    if (this.post.location.address.length > 300) {
      this.validateObject.validateAddress.maxLength.status = false;
      return this.validateObject.validateAddress.maxLength.message;
    } else {
      this.validateObject.validateAddress.maxLength.status = true;
      return '';
    }
  }
}
