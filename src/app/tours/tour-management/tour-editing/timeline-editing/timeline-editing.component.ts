import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbTimepickerConfig, NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateStructService } from 'src/app/core/services/date-struct.service';

@Component({
  selector: 'app-timeline-editing',
  templateUrl: './timeline-editing.component.html',
  styleUrls: ['./timeline-editing.component.scss']
})
export class TimelineEditingComponent implements OnInit {

  @Input() tourData: Tour;
  public startDate: NgbDate;
  public endDate: NgbDate;
  public feedbackDeadline: NgbDate;
  public registerDeadline: NgbDate;
  public today: NgbDate;
  public startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public feedbackTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public registerTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig,
    private dateStructService: DateStructService) {
    timepickerConfig.seconds = false;
    timepickerConfig.spinners = false;
  }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourEditing;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourEditing;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.today = this.dateStructService.getDateStructFromDate(new Date());

    this.startDate = this.dateStructService.getDateStructFromDate(this.tourData.beginTime);
    this.startTime = this.dateStructService.getTimeStructFormDate(this.tourData.beginTime);

    this.endDate = this.dateStructService.getDateStructFromDate(this.tourData.endTime);
    this.endTime = this.dateStructService.getTimeStructFormDate(this.tourData.endTime);

    this.feedbackDeadline = this.dateStructService.getDateStructFromDate(this.tourData.closeFeedbackTime);
    this.feedbackTime = this.dateStructService.getTimeStructFormDate(this.tourData.closeFeedbackTime);

    this.registerDeadline = this.dateStructService.getDateStructFromDate(this.tourData.closeRegisterTime);
    this.registerTime = this.dateStructService.getTimeStructFormDate(this.tourData.closeRegisterTime);
  }

  validateStartEndDate() {
    try {
      if (this.startDate && this.endDate
        && this.dateStructService.getDateFromDateStruct(this.startDate) > this.dateStructService.getDateFromDateStruct(this.endDate)) {
        this.endDate = this.startDate;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  onChangeDateTimePicker() {
    try {
      this.tourData.beginTime = this.dateStructService.getDateFromDateTimeStruct(this.startDate, this.startTime);
      this.tourData.endTime = this.dateStructService.getDateFromDateTimeStruct(this.endDate, this.endTime);
      this.tourData.closeFeedbackTime = this.dateStructService.getDateFromDateTimeStruct(this.feedbackDeadline, this.feedbackTime);
      this.tourData.closeRegisterTime = this.dateStructService.getDateFromDateTimeStruct(this.registerDeadline, this.registerTime);
    } catch (err) {
      console.log(err);
    }
  }
}
