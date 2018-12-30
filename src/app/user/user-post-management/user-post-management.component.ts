import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ConstantService } from '../../core/services/constant.service';
import { ServerService } from '../../core/services/server.service';
import { UserService } from '../../core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-post-management',
  templateUrl: './user-post-management.component.html',
  styleUrls: ['./user-post-management.component.scss']
})
export class UserPostManagementComponent implements OnInit {

  flagKindOfPost: any = {
    all: 'All',
    approved: this.constant.POST_STATUS.APPROVED,
    pending: this.constant.POST_STATUS.PENDING,
    denied: this.constant.POST_STATUS.DENY
  };
  chosenKindOfPost = this.flagKindOfPost.all;

  hasError: Boolean = false;
  errorMessage: String = '';

  listAllPost: any = [];
  listShowPost: any = [];

  postViewId: string;

  constructor(private language: LanguageService, private constant: ConstantService, private server: ServerService,
    private user: UserService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.refreshListPost();
  }

  /**
   * Show dialog review post
   * @name openPostViewDialog
   * @author phieu-th
   * @param contentId
   * @param postId
   */
  openPostViewDialog(contentId, postId: string) {
    this.postViewId = postId;
    this.modalService.open(contentId, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Get list all post was writen by current user
   * @name refreshListPost
   * @author phieu-th
   */
  refreshListPost() {
    this.server.getPostByAuthorUser(this.user.currentUser._id).subscribe((res) => {
      if (res.data) {
        this.listAllPost = res.data;
        this.listShowPost = res.data;
        this.resetError();
      } else {
        this.hasError = true;
        this.errorMessage = this.language.currentLanguage.userPostManagementListPostEmpty;
      }
    });
  }

  /**
   * Set non-error
   * @name resetError
   * @author phieu-th
   */
  resetError() {
    this.hasError = false;
    this.errorMessage = '';
  }

  /**
   * Filter list post be show by their status
   * @name filterListPostByPostStatus
   * @author phieu-th
   * @param postStatusFilter
   */
  filterListPostByPostStatus(postStatusFilter: string) {
    if (postStatusFilter === this.constant.POST_STATUS.APPROVED
      || postStatusFilter === this.constant.POST_STATUS.DENY
      || postStatusFilter === this.constant.POST_STATUS.PENDING) {
      this.listShowPost = [];
      this.listShowPost = this.listAllPost.filter(post => post.status === postStatusFilter);
      this.chosenKindOfPost = this.flagKindOfPost.postStatusFilter;
    } else {
      this.listShowPost = this.listAllPost;
      this.chosenKindOfPost = this.flagKindOfPost.all;
    }
  }

  /**
   * Filter list post by date set in Date input
   * @name filterListPostByDate
   * @author phieu-th
   * @param startDate
   * @param endDate
   */
  filterListPostByDate(startDate: Date, endDate: Date) {
    if (startDate <= endDate) {
      this.listShowPost = this.listAllPost.filter(post => new Date(post.createdTime) >= startDate
        && new Date(post.createdTime) <= endDate
        && (post.status === this.chosenKindOfPost || this.chosenKindOfPost === this.flagKindOfPost.all));
    }
  }

  /**
   * Sort an array have property createdTime from near to far
   * @name sortPostArrayByDate
   * @author phieu-th
   * @param arr
   */
  sortPostArrayByDate(arr: any) {
    arr = arr.sort((item1, item2) => new Date(item2.createdTime).valueOf() - new Date(item1.createdTime).valueOf());
  }
}
