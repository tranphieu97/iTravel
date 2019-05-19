import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbDateStruct, NgbTimeStruct, NgbTimepickerConfig, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TourSchedule } from 'src/app/model/tour-schedule.model';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  private readonly DEFAULT_OPTION = 'SELECT_AN_OPTION';

  @Input() scheduleModel: TourSchedule;
  @Input() arrPerform: Array<any>;

  public startDate: NgbDate;
  public beginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public arrTaskNote: Array<string>;

  private isFinishedInput: Boolean = false;
  private isPickedCurrentTask: Boolean = true;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig, private modal: NgbModal) {
    timepickerConfig.seconds = false;
   }

  ngOnInit() {
    this.setupDefaultView();
  }

  addAnotherToArr(arr: Array<any>) {
    if (arr.length > 0 && arr[arr.length - 1] !== this.DEFAULT_OPTION) {
      this.isPickedCurrentTask = true;

      arr.push(this.DEFAULT_OPTION);
      this.arrTaskNote.push('');
    } else {
      this.isPickedCurrentTask = false;
      setTimeout(() => {
        this.isPickedCurrentTask = true;
      }, 5000);
    }
  }

  setupDefaultView() {
    this.scheduleModel = new TourSchedule();

    this.scheduleModel.tasks.push(this.DEFAULT_OPTION);
    this.scheduleModel.performerIds.push(this.DEFAULT_OPTION);

    this.arrTaskNote = [];
  }

  setIndexValue(arr: Array<any>, index: number, value: any) {
    try {
      if (index > -1 && index < arr.length) {
        arr[index] = value;
      }

      if (value !== this.DEFAULT_OPTION) {
        this.isPickedCurrentTask = true;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  removeItem(arr: Array<any>, index: number) {
    try {
      if (arr.length > 1 && arr.length > index && index > -1) {
        arr.splice(index, 1);
        this.arrTaskNote.slice(index, 1);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  finishSchedule() {
    if (this.scheduleModel.tasks[this.scheduleModel.tasks.length - 1] === this.DEFAULT_OPTION) {
      this.isPickedCurrentTask = false;
    }

    else {
      this.isFinishedInput = true;
    }
  }
}
