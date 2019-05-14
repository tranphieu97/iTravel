import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Injectable({
  providedIn: 'root'
})
export class DateStructService {

  constructor() { }

  getDateStructFromDate(date: Date): NgbDateStruct {
    try {
      return {
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
      };
    } catch {
      return {
        day: 1,
        month: 1,
        year: 1
      };
    }
  }

  getDateFromDateStruct(dateStruct: NgbDateStruct): Date {
    try {
      return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    } catch {
      return new Date();
    }
  }

  getDateFromDateTimeStruct(dateStruct: NgbDateStruct, timeStruct: NgbTimeStruct): Date {
    try {
      return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day, timeStruct.hour, timeStruct.minute, timeStruct.second);
    } catch {
      return new Date();
    }
  }
}
