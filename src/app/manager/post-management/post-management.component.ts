import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../core/services/server.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss']
})
export class PostManagementComponent implements OnInit {

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

  listAllPost: any = [];
  listShowPost: any = [];

  closeResult: string;

  postViewId = '';

  denyForm: FormGroup;

  constructor(private language: LanguageService, private calendar: NgbCalendar, private server: ServerService,
    private modalService: NgbModal, private constant: ConstantService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.refreshListPost();

    // Set deny form
    this.denyForm = this.formBuilder.group({
      postId: [null, [Validators.required]],
      postTitle: [null, [Validators.required]],
      denyReason: [null, [Validators.required]]
    });
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
      this.errorMessage = this.language.currentLanguage.postManagementErrorEmptyDate;
      this.hasError = true;
    } else {
      if (this.validDateFormat(this.startDate) && this.validDateFormat(this.endDate)) {
        if (this.convertDateStructToDate(this.startDate) <= this.convertDateStructToDate(this.endDate)) {
          this.hasError = false;
        } else {
          this.errorMessage = this.language.currentLanguage.postManagementErrorStartAfterEnd;
          this.hasError = true;

          const startD = new Date(this.startDate.year, this.startDate.month, this.startDate.day, 0, 0, 0, 0);
          const endD = new Date(this.endDate.year, this.endDate.month, this.endDate.day, 0, 0, 0, 0);

          this.filterListPostByDate(startD, endD);
        }
      } else {
        this.errorMessage = this.language.currentLanguage.postManagementErrorInvalidDate;
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
    } else {
      this.listShowPost = this.listAllPost;
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
      this.listShowPost = this.listShowPost.filter(post => post.createdTime >= startDate && post.createdTime <= endDate);
    }
  }

  /**
   * Get list post from server
   * @name refreshListPost
   * @author phieu-th
   */
  refreshListPost() {
    this.server.getPostsByManager().subscribe((res) => {
      if (res.data) {
        this.listAllPost = res.data;
        this.listShowPost = this.listAllPost;
      }
    });
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
        this.errorMessage = this.language.currentLanguage.postManagementPostApprovedBefore;
      } else if (result.message.indexOf('Not found post') !== -1) {
        this.hasError = true;
        this.errorMessage = this.language.currentLanguage.postManagementPostNotFound;
      } else {
        this.hasError = true;
        this.errorMessage = this.language.currentLanguage.postManagementErrorChangeStatus;
      }
    });
  }

  denyPost(postId: string) {
    const formControlPostId = this.denyForm.get('postId').value;
    const formControlReasion = this.denyForm.get('denyReason').value;

    if (formControlPostId !== postId || formControlReasion === '') {
      this.hasError = true;
      this.errorMessage = this.language.currentLanguage.postManagementErrorInvalidDenyData;
    } else {
      this.server.updatePostStatus(postId, this.constant.POST_STATUS.DENY, formControlReasion).subscribe((res) => {
        if (res) {
          if (res.message.indexOf('Denied Success') !== -1) {
            this.refreshListPost();
          } else if (res.message.indexOf('It was denied before') !== -1) {
            this.hasError = true;
            this.errorMessage = this.language.currentLanguage.postManagementErrorPostDenied;
          } else if (res.message.indexOf('Not found post') !== -1) {
            this.hasError = true;
            this.errorMessage = this.language.currentLanguage.postManagementPostNotFound;
          } else {
            this.hasError = true;
            this.errorMessage = this.language.currentLanguage.postManagementErrorChangeStatus;
          }
        }
      });
    }
  }
}
