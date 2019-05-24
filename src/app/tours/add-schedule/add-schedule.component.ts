import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbDateStruct, NgbTimeStruct, NgbTimepickerConfig, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TourSchedule } from 'src/app/model/tour-schedule.model';
import { AddTourService } from 'src/app/core/services/add-tour.service';
import { DateStructService } from 'src/app/core/services/date-struct.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  private readonly DEFAULT_OPTION = '';

  @Input() scheduleModel: TourSchedule;
  @Input() index: number;

  public startDate: NgbDate;
  public beginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public arrPerforms: Array<any>;

  public minDate: NgbDate;
  public maxDate: NgbDate;

  public isFinishedInput: Boolean = false;
  public isPickedCurrentTask: Boolean = true;
  public isValidDate: Boolean = true;

  public finishedStartDate: Date;
  public finishedEndDate: Date;

  compLanguage;
  commonLanguage;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig, private modal: NgbModal,
    private addTourService: AddTourService, private dateStructService: DateStructService) {
    timepickerConfig.seconds = false;
   }

  ngOnInit() {
    this.setupDefaultView();
    this.compLanguage = this.language.currentLanguage.compAddSchedule;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compAddSchedule;
      this.commonLanguage = this.language.currentLanguage.common;
    });
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
    if (this.scheduleModel.tasks.length === 0) {
      this.scheduleModel.tasks.push('');
    }

    if (this.scheduleModel.performerIds.length === 0) {
      this.scheduleModel.performerIds.push('');
    }

    this.startDate = this.dateStructService.getDateStructFromDate(this.addTourService.getBeginTime());
    this.maxDate = this.dateStructService.getDateStructFromDate(this.addTourService.getEndTime());
    this.minDate = this.dateStructService.getDateStructFromDate(this.addTourService.getCloseRegisterTime());

    this.arrPerforms = this.addTourService.getArrPerform();
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
    this.addTourService.hasRemoveSchedule.next(this.index);
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
    this.addTourService.hasChangeCost.next();
  }

  finishSchedule() {
    this.onChangeTime();
    if (this.scheduleModel.tasks[this.scheduleModel.tasks.length - 1] === this.DEFAULT_OPTION) {
      this.isPickedCurrentTask = false;
    }  else if (this.isValidDate) {
      this.isFinishedInput = true;
    }
  }
}
