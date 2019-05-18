import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTourService {

  private startDate: Date;
  private endDate: Date;
  private arrPerformsId: Array<string>;
  private minDateCanSetSchedule: Date;

  public getStartDate(): Date {
    return this.startDate;
  }

  public setStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public setEndDate(endDate: Date): void {
    this.endDate = endDate;
  }

  public getArrPerformsId(): Array<string> {
    if (!this.arrPerformsId) {
      this.arrPerformsId = [];
    }
    return this.arrPerformsId;
  }

  public setArrPerformsId(arrPerformsId: Array<string>): void {
    this.arrPerformsId = arrPerformsId;
  }

  public getMinDateCanSetSchedule(): Date {
    return this.minDateCanSetSchedule;
  }

  public setMinDateCanSetSchedule(minDateCanSetSchedule: Date): void {
    this.minDateCanSetSchedule = minDateCanSetSchedule;
  }

  constructor() { }

}
