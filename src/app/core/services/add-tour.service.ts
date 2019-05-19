import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class AddTourService {

  private arrPerformsId: Array<string>;
  private minDateCanSetSchedule: Date;
  private currentTour: Tour;

  constructor() { }

  public setNewTour() {
    this.currentTour = new Tour();
  }

  public getStartDate(): Date {
    return this.currentTour.beginTime;
  }

  public setStartDate(startDate: Date): void {
    this.currentTour.beginTime = startDate;
  }

  public getEndDate(): Date {
    return this.currentTour.endTime;
  }

  public setEndDate(endDate: Date): void {
    this.currentTour.endTime = endDate;
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
}
