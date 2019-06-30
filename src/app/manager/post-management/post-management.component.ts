import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../core/services/server.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss']
})
export class PostManagementComponent implements OnInit, OnDestroy {

  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  date: { year: number, month: number, day: number };

  flagKindOfPost: any = {
    all: 'All',
    approved: this.constant.POST_STATUS.APPROVED,
    pending: this.constant.POST_STATUS.PENDING,
    denied: this.constant.POST_STATUS.DENY
  };
  chosenKindOfPost = this.flagKindOfPost.all;

  hasError: Boolean = false;
  errorMessage: String = '';
  isLoading: Boolean = true;

  listAllPost: any = [];
  listShowPost: any = [];

  closeResult: string;
  postViewId = '';
  denyForm: FormGroup;

  public page: Number = 1;
  public pageSize: Number = 8;

  compLanguage;
  logoutSubscription;

  constructor(public language: LanguageService, private calendar: NgbCalendar, private server: ServerService,
    private modalService: NgbModal, public constant: ConstantService, private formBuilder: FormBuilder,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.refreshListPost();

    // Set deny form
    this.denyForm = this.formBuilder.group({
      postId: [null, [Validators.required]],
      postTitle: [null, [Validators.required]],
      denyReason: [null, [Validators.required]]
    });

    this.compLanguage = this.language.currentLanguage.compPostManagement;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.compPostManagement);
    this.logoutSubscription = this.userService.hasChangeUser.subscribe(() => {
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
   * Show dialog deny a post and set default value for dialog
   * @name openPostDenyDialog
   * @author phieu-th
   * @param contentId
   * @param postId
   * @param postTitle
   */
  openPostDenyDialog(contentId, postId: string, postTitle: string) {
    this.denyForm.get('postId').setValue(postId);
    this.denyForm.get('postTitle').setValue(postTitle);
    this.denyForm.get('denyReason').setValue('');
    this.postViewId = postId;

    this.modalService.open(contentId, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Validate 2 date input when click Filter Button
   * @name validateDateForm
   * @author phieu-th
   */
  validateDateForm() {
    if (this.startDate === undefined || this.endDate === undefined) {
      this.errorMessage = this.compLanguage.postManagementErrorEmptyDate;
      this.hasError = true;
    } else {
      if (this.validDateFormat(this.startDate) && this.validDateFormat(this.endDate)) {
        if (this.convertDateStructToDate(this.startDate) > this.convertDateStructToDate(this.endDate)) {
          this.hasError = true;
          this.errorMessage = this.compLanguage.postManagementErrorStartAfterEnd;
        } else {
          this.hasError = false;

          const startD = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day, 0, 0, 0, 0);
          const endD = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day, 0, 0, 0, 0);

          this.filterListPostByDate(startD, endD);
        }
      } else {
        this.errorMessage = this.compLanguage.postManagementErrorInvalidDate;
        this.hasError = true;
      }
    }
  }

  /**
   * Check a NgBDateStruct type variable is a valid date
   * NgBDateStruct type auto become undefined if it's invalid date
   * @name validDateFormat
   * @author phieu-th
   * @param checkedDate
   */
  validDateFormat(checkedDate: NgbDateStruct): boolean {
    const strDate: string = checkedDate.year + '-' + checkedDate.month + '-' + checkedDate.day;

    if (strDate.indexOf('undefined') !== -1) {
      return false;
    }
    return true;
  }

  /**
   * Convert a NgBDateStruct type to Date type
   * @name convertDateStructToDate
   * @author phieu-th
   * @param dateStruct
   */
  convertDateStructToDate(dateStruct: NgbDateStruct): Date {
    try {
      const strDate: string = dateStruct.year + '-' + dateStruct.month + '-' + dateStruct.day;
      const dateResult: Date = new Date(strDate);
      return dateResult;
    } catch (ex) { }
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
   * Get list post from server
   * @name refreshListPost
   * @author phieu-th
   */
  refreshListPost() {
    this.isLoading = true;
    this.server.getPostsByManager().subscribe((res) => {
      if (res.data) {
        this.listAllPost = res.data;
        this.sortPostArrayByDate(this.listAllPost);
        this.listShowPost = this.listAllPost;
      }
      this.isLoading = false;
    });
    this.resetError();
  }

  /**
   * Approve a post by post id
   * @param postId
   */
  approvePost(postId: string) {
    this.server.updatePostStatus(postId, this.constant.POST_STATUS.APPROVED, null).subscribe((result) => {
      if (result.message.indexOf('Approved Success') !== -1) {
        this.refreshListPost();
      } else if (result.message.indexOf('It was approved before') !== -1) {
        this.hasError = true;
        this.errorMessage = this.compLanguage.postManagementPostApprovedBefore;
      } else if (result.message.indexOf('Not found post') !== -1) {
        this.hasError = true;
        this.errorMessage = this.compLanguage.postManagementPostNotFound;
      } else {
        this.hasError = true;
        this.errorMessage = this.compLanguage.postManagementErrorChangeStatus;
      }
    });
  }

  /**
   * Deny a post by postId
   * @name denyPost
   * @author phieu-th
   */
  denyPost(postId: string) {
    const formControlPostId = this.denyForm.get('postId').value;
    const formControlReasion = this.denyForm.get('denyReason').value;

    if (formControlPostId !== postId || formControlReasion === '') {
      this.hasError = true;
      this.errorMessage = this.compLanguage.postManagementErrorInvalidDenyData;
    } else {
      this.server.updatePostStatus(postId, this.constant.POST_STATUS.DENY, formControlReasion).subscribe((res) => {
        if (res) {
          if (res.message.indexOf('Denied Success') !== -1) {
            this.refreshListPost();
          } else if (res.message.indexOf('It was denied before') !== -1) {
            this.hasError = true;
            this.errorMessage = this.compLanguage.postManagementErrorPostDenied;
          } else if (res.message.indexOf('Not found post') !== -1) {
            this.hasError = true;
            this.errorMessage = this.compLanguage.postManagementPostNotFound;
          } else {
            this.hasError = true;
            this.errorMessage = this.compLanguage.postManagementErrorChangeStatus;
          }
        }
      });
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
