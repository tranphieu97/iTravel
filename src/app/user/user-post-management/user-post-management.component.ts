import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class UserPostManagementComponent implements OnInit, OnDestroy {

  FLAG_KIND_OF_POST: any = {
    ALL: 'All',
    APPROVED: this.constant.POST_STATUS.APPROVED,
    PENDING: this.constant.POST_STATUS.PENDING,
    DENIED: this.constant.POST_STATUS.DENY
  };
  chosenKindOfPost = this.FLAG_KIND_OF_POST.all;

  FLAG_KIND_OF_TIME: any = {
    ALL: 0,
    ONE_WEEK: 1,
    ONE_MONTH: 2
  };
  chosenKindOfTime = this.FLAG_KIND_OF_TIME.ALL;

  hasError: Boolean = false;
  errorMessage: String = '';
  isLoading: Boolean = true;

  listAllPost: any = [];
  listShowPost: any = [];

  postViewId: string;
  searchKeyword: String = '';

  page: Number = 1;
  pageSize: Number = 8;
  logoutSubscription;

  compLanguage;
  constructor(public language: LanguageService, public constant: ConstantService, private server: ServerService,
    private user: UserService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.refreshListPost();
    this.compLanguage = {...this.language.currentLanguage.compUserPostManagement};
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = {...this.language.currentLanguage.compUserPostManagement};
    });
    this.logoutSubscription = this.user.hasChangeUser.subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
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
    this.isLoading = true;
    this.server.getPostByAuthorUser(this.user.currentUser._id).subscribe((res) => {
      if (res.data) {
        this.listAllPost = res.data;
        this.listShowPost = res.data;
        this.resetError();
      } else {
        this.hasError = true;
        this.errorMessage = this.compLanguage.userPostManagementListPostEmpty;
      }
      this.isLoading = false;
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
      this.chosenKindOfPost = this.FLAG_KIND_OF_POST.postStatusFilter;
    } else {
      this.listShowPost = this.listAllPost;
      this.chosenKindOfPost = this.FLAG_KIND_OF_POST.all;
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
        && (post.status === this.chosenKindOfPost || this.chosenKindOfPost === this.FLAG_KIND_OF_POST.all));
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

  /**
   * Filter list is showing post by user typing keyword
   * @name filterListPostByKeyWord
   * @author phieu-th
   */
  filterListPostByTypingKeyWord() {
    this.listShowPost = this.listAllPost.filter(x => x.title.toLowerCase().indexOf(this.searchKeyword.valueOf().toLowerCase()) !== -1);
  }
}
