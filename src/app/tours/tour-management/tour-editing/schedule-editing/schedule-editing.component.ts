import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbTimepickerConfig, NgbModal, NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateStructService } from 'src/app/core/services/date-struct.service';
import { TourSchedule } from 'src/app/model/tour-schedule.model';
import { EditTourService } from 'src/app/core/services/edit-tour.service';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-schedule-editing',
  templateUrl: './schedule-editing.component.html',
  styleUrls: ['./schedule-editing.component.scss']
})
export class ScheduleEditingComponent implements OnInit {

  private readonly DEFAULT_OPTION = '';

  @Input() scheduleModel: TourSchedule;
  @Input() index: number;

  public startDate: NgbDate;
  public beginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public arrPerforms: Array<any>;

  public minDate: NgbDate;
  public maxDate: NgbDate;

  public isFinishedInput: Boolean = true;
  public isPickedCurrentTask: Boolean = true;
  public isValidDate: Boolean = true;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig, private modal: NgbModal,
    private dateStructService: DateStructService, private editTourService: EditTourService) {
    timepickerConfig.seconds = false;
    timepickerConfig.spinners = false;
  }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compAddSchedule;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compAddSchedule;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.setupDefaultView();
  }

  addAnotherToArr(arr: Array<any>) {
    if (arr.length > 0 && arr[arr.length - 1].trim() !== '') {
      this.isPickedCurrentTask = true;

      arr.push('');
    } else {
      this.isPickedCurrentTask = false;
      setTimeout(() => {
        this.isPickedCurrentTask = true;
      }, 5000);
    }
  }

  setupDefaultView() {
    try {
      this.arrPerforms = this.editTourService.getArrPerforms();
      this.maxDate = this.dateStructService.getDateStructFromDate(this.editTourService.getMaxDateCanChosen());
      this.minDate = this.dateStructService.getDateStructFromDate(this.editTourService.getMinDateCanChosen());

      if (this.scheduleModel.beginTime) {
        this.startDate = this.dateStructService.getDateStructFromDate(this.scheduleModel.beginTime);
        this.beginTime = this.dateStructService.getTimeStructFormDate(this.scheduleModel.beginTime);
      }

      if (this.scheduleModel.endTime) {
        this.endTime = this.dateStructService.getTimeStructFormDate(this.scheduleModel.endTime);
      }

      // After click add schedule
      if (this.scheduleModel.tasks.length === 0) {
        this.scheduleModel.tasks.push('');
        this.isFinishedInput = false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  removeItem(arr: Array<any>, index: number) {
    try {
      if (arr.length > 1 && arr.length > index && index > -1) {
        arr.splice(index, 1);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  removeSchedule() {
    this.editTourService.hasRemoveSchedule.next(this.index);
  }

  onChangeTime() {
    try {
      this.scheduleModel.beginTime = this.dateStructService.getDateFromDateTimeStruct(this.startDate, this.beginTime);
      this.scheduleModel.endTime = this.dateStructService.getDateFromDateTimeStruct(this.startDate, this.endTime);
      if (this.scheduleModel.beginTime > this.scheduleModel.endTime) {
        this.isValidDate = false;
      } else {
        this.isValidDate = true;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  onChangeCost() {
    this.editTourService.hasChangeCost.next();
  }

  finishSchedule() {
    this.onChangeTime();
    if (this.scheduleModel.tasks[this.scheduleModel.tasks.length - 1] === this.DEFAULT_OPTION) {
      this.isPickedCurrentTask = false;

      setTimeout(() => {
        this.isPickedCurrentTask = true;
      }, 5000);
    } else if (this.isValidDate) {
      this.isFinishedInput = true;
    }
  }
}
