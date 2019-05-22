import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTourService {

  private minDateCanSetSchedule: Date;
  private arrPerform: Array<any>;

  public tourModel: Tour;

  public hasRemoveSchedule: Subject<number>;
  public hasRemovePreparation: Subject<number>;

  constructor() { }

  public getArrPerform(): Array<any> {
    if (!this.arrPerform) {
      this.arrPerform = [];
    }
    return this.arrPerform;
  }

  public setArrPerform(arrPerform: Array<any>): void {
    this.arrPerform = arrPerform;
  }

  public setupTour() {
    this.tourModel = new Tour();
    this.hasRemoveSchedule = new Subject<number>();
    this.hasRemovePreparation = new Subject<number>();
  }

  getBeginTime() {
    return this.tourModel.beginTime;
  }

  getEndTime() {
    return this.tourModel.endTime;
  }

  getCloseRegisterTime() {
    return this.tourModel.closeRegisterTime;
  }
}
