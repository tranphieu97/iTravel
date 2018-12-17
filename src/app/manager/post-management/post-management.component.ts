import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../core/services/server.service';
import { ConstantService } from 'src/app/core/services/constant.service';

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

  constructor(private language: LanguageService, private calendar: NgbCalendar, private server: ServerService,
    private modalService: NgbModal, private constant: ConstantService) { }

  ngOnInit() {
    this.server.getPostsByManager().subscribe((res) => {
      if (res.data) {
        this.listAllPost = res.data;
        this.listShowPost = this.listAllPost;
      }
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
}
