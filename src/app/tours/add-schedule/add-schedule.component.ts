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

  private readonly DEFAULT_OPTION = 'SELECT_AN_OPTION';

  @Input() scheduleModel: TourSchedule;
  @Input() index: number;

  public startDate: NgbDate;
  public beginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public arrTaskNote: Array<string>;
  public arrPerforms: Array<any>;

  public minDate: NgbDate;
  public maxDate: NgbDate;

  private isFinishedInput: Boolean = false;
  private isPickedCurrentTask: Boolean = true;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig, private modal: NgbModal,
    private addTourService: AddTourService, private dateStructService: DateStructService) {
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
    this.scheduleModel.tasks.push(this.DEFAULT_OPTION);
    this.scheduleModel.performerIds.push(this.DEFAULT_OPTION);

    this.startDate = this.dateStructService.getDateStructFromDate(this.addTourService.getBeginTime());
    this.maxDate = this.dateStructService.getDateStructFromDate(this.addTourService.getEndTime());
    this.minDate = this.dateStructService.getDateStructFromDate(this.addTourService.getCloseRegisterTime());

    this.arrPerforms = this.addTourService.getArrPerform();

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

  removeSchedule() {
    this.addTourService.hasRemoveSchedule.next(this.index);
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
