import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbDateStruct, NgbTimeStruct, NgbTimepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TourSchedule } from 'src/app/model/tour-schedule.model';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  private readonly DEFAULT_OPTION = 'SELECT_AN_OPTION';

  public startDate: NgbDateStruct;
  public beginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public arrTaskNote: Array<string>;

  private hasFinishedCurrentTask = true;

  @Input() scheduleModel: TourSchedule;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig, private modal: NgbModal) {
    // timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
   }

  ngOnInit() {
    this.setupDefaultView();
  }

  write(value: any) {
    console.log(value);
  }

  addAnotherToArr(arr: Array<any>) {
    if (arr.length > 0 && arr[arr.length - 1] !== this.DEFAULT_OPTION) {
      this.hasFinishedCurrentTask = true;

      arr.push(this.DEFAULT_OPTION);
      this.arrTaskNote.push('');
    } else {
      this.hasFinishedCurrentTask = false;
      setTimeout(() => {
        this.hasFinishedCurrentTask = true;
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
}
