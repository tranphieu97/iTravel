import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';
import { ConstantService } from 'src/app/core/services/constant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  // local post receive data from service
  // it should has init data until receiving data from server so browser will not has error
  post: Post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], [], '', [], '');
  // if postId == '' => create new post
  // if postId != '' => edit post
  postId = '';
  // array store new image need to upload to server
  newImageFiles: { imgFile: File, contentId: string }[] = [];
  coverFile: File = null;
  // variable store current language
  compLanguage = this.language.currentLanguage;
  // variable store alert
  alertContent = '';
  // saved alert content
  savedSuccessAlertContent = this.compLanguage.createPostAlertSaveSuccess;
  // can't Saved alert content
  cantSavedAlertContent = this.compLanguage.createPostAlertSaveAlready;
  // validate status of the whole post
  postIsValid = false;
  // variable store status that save post successfully or not
  // if already success => can't click save again
  isSaved = false;
  isUpdate = false;
  // all validate status
  validateObject = {
    // variable check valid or not foreach properties
    validateTitle: {
      maxLength: { status: false, message: this.compLanguage.createPostInvalidTitleLength },
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidTitleEmpty }
    },
    validateDesc: {
      maxLength: { status: false, message: this.compLanguage.createPostInvalidDescLength },
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidDescEmpty }
    },
    validateCover: {
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidCoverEmpty }
    },
    validateCategory: {
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidCategoryEmpty }
    },
    validateTag: {
      maxLength: { status: false, message: this.compLanguage.createPostInvalidTagLength }
    },
    validatePlace: {
      maxLength: { status: false, message: this.compLanguage.createPostInvalidPlaceLength },
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidPlaceEmpty }
    },
    validateAddress: {
      maxLength: { status: false, message: this.compLanguage.createPostInvalidAddressLength }
    },
    validateProvinceCity: {
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidProvinceEmpty }
    },
    validatePostContent: {
      notEmpty: { status: false, message: this.compLanguage.createPostInvalidTopicEmpty }
    }
  };

  constructor(
    private postService: PostService,
    private serverService: ServerService,
    private constant: ConstantService,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private language: LanguageService) { }

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
      } else { // id.length == 24
        this.isUpdate = true;
        this.serverService.getOnePost(this.postId).subscribe((resData) => {
          if (resData.data !== null && resData.data !== undefined) {
            // if user is not the author of post => cant edit
            if (this.user.currentUser._id !== resData.data.authorId) {
              this.router.navigate(['/not-found']);
            } else {
              this.post = resData.data;
            }
          } else {
            this.router.navigate(['/not-found']);
          }
        });
      }
    });

    // subscribe when change language
    this.language.hasChangeLanguage.asObservable().subscribe(() => {
      this.compLanguage = this.language.currentLanguage;
      this.changeLanguage();
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
    this.postService.postContentChanged.asObservable().subscribe(() => {
      this.alertContent = this.validatePostContent();
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
    // reset the <input> file for the next time
    (event.target as HTMLInputElement).value = '';
  }

  onSave() {
    if (this.isSaved === true) {
      this.alertContent = this.cantSavedAlertContent;
      return;
    }
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
          console.log(resData);
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
          if (this.coverFile && resData.imageUrls[resData.imageUrls.length - 1]) {
            this.post.cover = resData.imageUrls[resData.imageUrls.length - 1];
          }
          // save post, if id == '', => this is new post and need create new post
          // if id already exist, => this is old post and need update post
          if (this.postId === '') {
            // fix some default infomation for new post
            this.post._id = null;
            this.post.createdTime = new Date();
            this.post.approvedTime = null;
            this.post.authorId = this.user.currentUser._id;
            this.post.rating = [];
            this.post.status = this.constant.POST_STATUS.PENDING;
            this.serverService.postOnePost(this.post)
              .subscribe((responseData) => {
                if (responseData) {
                  this.isSaved = true;
                  this.postId = responseData.postId;
                }
              });
          } else if (this.postId.length === 24) {
            // save edited post
            // fix some default infomation for update post
            this.post.approvedTime = null;
            this.post.status = this.constant.POST_STATUS.PENDING;
            this.serverService.updateOnePost(this.post)
              .subscribe((responseData) => {
                if (responseData) {
                  this.isSaved = true;
                  this.postId = responseData.postId;
                }
              });
          }
        } else {
          // can not get response
        }
      });
    } else {
    }
  }

  onViewPost() {
    this.router.navigate(['/view-post', this.postId]);
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
    // on create new post
    // this.router.navigate(['/create-post']);
    this.post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], [], '', [], '');

    // on edit post
    // if (this.postId.length === 24) {
    //   this.serverService.getOnePost(this.postId).subscribe((resData) => {
    //     if (resData.data !== null && resData.data !== undefined) {
    //       this.post = resData.data;
    //     } else {
    //       this.router.navigate(['/not-found']);
    //     }
    //   });
    // }
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

  changeLanguage() {
    this.validateObject.validateTitle.notEmpty.message = this.compLanguage.createPostInvalidTitleEmpty;
    this.validateObject.validateTitle.maxLength.message = this.compLanguage.createPostInvalidTitleLength;
    this.validateObject.validateDesc.maxLength.message = this.compLanguage.createPostInvalidDescLength;
    this.validateObject.validateDesc.notEmpty.message = this.compLanguage.createPostInvalidDescEmpty;
    this.validateObject.validateCover.notEmpty.message = this.compLanguage.createPostInvalidCoverEmpty;
    this.validateObject.validateCategory.notEmpty.message = this.compLanguage.createPostInvalidCategoryEmpty;
    this.validateObject.validateTag.maxLength.message = this.compLanguage.createPostInvalidTagLength;
    this.validateObject.validatePlace.maxLength.message = this.compLanguage.createPostInvalidPlaceLength;
    this.validateObject.validatePlace.notEmpty.message = this.compLanguage.createPostInvalidPlaceEmpty;
    this.validateObject.validateAddress.maxLength.message = this.compLanguage.createPostInvalidAddressLength;
    this.validateObject.validateProvinceCity.notEmpty.message = this.compLanguage.createPostInvalidProvinceEmpty;
    this.validateObject.validatePostContent.notEmpty.message = this.compLanguage.createPostInvalidTopicEmpty;
    this.cantSavedAlertContent = this.compLanguage.createPostAlertSaveAlready;
    this.savedSuccessAlertContent = this.compLanguage.createPostAlertSaveSuccess;
  }

  validateAll() {
    this.alertContent =
      this.validateTitle() + '\n'
      + this.validateDescription() + '\n'
      + this.validateCover() + '\n'
      + this.validateCategory() + '\n'
      + this.validatePlace() + '\n'
      + this.validateProvinceCity() + '\n'
      + this.validateAddress() + '\n'
      + this.validatePostContent();
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
    if (!this.coverFile && !this.isUpdate) {
      this.validateObject.validateCover.notEmpty.status = false;
      return this.validateObject.validateCover.notEmpty.message;
    } else {
      this.validateObject.validateCover.notEmpty.status = true;
      return '';
    }
  }

  validatePostContent() {
    if (this.post.postContents.length <= 0) {
      this.validateObject.validatePostContent.notEmpty.status = false;
      return this.validateObject.validatePostContent.notEmpty.message;
    } else {
      this.validateObject.validatePostContent.notEmpty.status = true;
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

  onTest() {
    this.router.navigate(['/create-post', '5c1a4602f0491d2a9c8a2ff7']);
  }
}
