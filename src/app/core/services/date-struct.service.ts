import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateStructService {

  constructor() { }

  getDateStructFromDate(date: Date): NgbDate {
    try {
      return new NgbDate( date.getFullYear(), date.getMonth() + 1, date.getDate());
    } catch {
      return new NgbDate( 1, 1, 1);
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
