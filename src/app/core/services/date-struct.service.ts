import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateStructService {

  constructor() { }

  getDateStructFromDate(date: Date): NgbDate {
    try {
      // Sometime function had input value type string
      date = new Date(date);

      return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    } catch (er) {
      console.log(er);
      return new NgbDate(2000, 1, 1);
    }
  }

  getTimeStructFormDate(date: Date): NgbTimeStruct {
    try {
      // Sometime function had input value type string
      date = new Date(date);

      return { hour: date.getHours(), minute: date.getMinutes(), second: 0 };
    } catch {
      return { hour: 0, minute: 0, second: 0 };
    }
  }

  getDateFromDateStruct(dateStruct: NgbDate): Date {
    try {
      return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    } catch {
      return new Date();
    }
  }

  getDateFromDateTimeStruct(dateStruct: NgbDate, timeStruct: NgbTimeStruct): Date {
    try {
      return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day, timeStruct.hour, timeStruct.minute, timeStruct.second);
    } catch {
      return new Date();
    }
  }
}
