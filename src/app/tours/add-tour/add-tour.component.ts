import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
// tslint:disable-next-line:max-line-length
import { NgbDateStruct, NgbCalendar, NgbDate, NgbModal, ModalDismissReasons, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class AddTourComponent implements OnInit {

  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig) {
    timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
  }

  ngOnInit() {
  }

}
