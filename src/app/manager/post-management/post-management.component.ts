import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
    approveded: 'Approveded',
    pendding: 'Pendding',
    denied: 'Denied'
  };
  chosenKindOfPost = this.flagKindOfPost.all;

  dateRegex: RegExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

  hasError: Boolean = false;
  errorMessage: String = '';

  constructor(private language: LanguageService, private calendar: NgbCalendar) { }

  ngOnInit() {
  }

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

  validDateFormat(checkedDate: NgbDateStruct): boolean {
    const strDate: string = checkedDate.year + '-' + checkedDate.month + '-' + checkedDate.day;

    if (strDate.indexOf('undefined') !== -1) {
      return false;
    }
    return true;
  }

  convertDateStructToDate(dateStruct: NgbDateStruct): Date {
    try {
      const strDate: string = dateStruct.year + '-' + dateStruct.month + '-' + dateStruct.day;
      const dateResult: Date = new Date(strDate);
      return dateResult;
    } catch (ex) { }
  }

  resetError() {
    this.hasError = false;
    this.errorMessage = '';
  }
}
