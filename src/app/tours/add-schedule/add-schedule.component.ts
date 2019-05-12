import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbDateStruct, NgbTimeStruct, NgbTimepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  public startDate: NgbDateStruct;
  public beginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig, private modal: NgbModal) {
    // timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
   }

  ngOnInit() {
  }

}
