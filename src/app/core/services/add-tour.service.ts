import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { Subject } from 'rxjs';
import { element } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class AddTourService {

  private minDateCanSetSchedule: Date;
  private arrPerform: Array<any>;

  public tourModel: Tour;

  public hasRemoveSchedule: Subject<number>;
  public hasRemovePreparation: Subject<number>;
  public hasChangeCost: Subject<any>;

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
    this.hasChangeCost = new Subject<any>();
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

  validateSchedule(): Boolean {
    try {
      let isValid = true;
      if (this.tourModel.schedules && this.tourModel.schedules.length > 0) {
        this.tourModel.schedules.forEach(schedule => {
          if (schedule.beginTime > schedule.endTime) {
            isValid = false;
          }

          if (schedule.tasks.length === 0) {
            isValid = false;
          } else if (schedule.tasks.length === 1) {
            if (schedule.tasks[0] === '' || schedule.tasks[0].trim() === '') {
              isValid = false;
            }
          } else {
            // Pop if user click add more but not write anything in the last input
            if (schedule.tasks[schedule.tasks.length - 1].trim() === '') {
              schedule.tasks.pop();
            }

            schedule.tasks.forEach(task => {
              if (task === '' || task.trim() === '') {
                isValid = false;
              }
            });
          }
        });
      } else {
        isValid = false;
      }

      return isValid;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  validatePreparations(): Boolean {
    try {
      let isValid = true;
      if (this.tourModel.preparations && this.tourModel.preparations.length > 0) {
        this.tourModel.preparations.forEach(preparation => {
          if (preparation.itemName.trim() === '' || preparation.amount === null || preparation.amount < 1) {
            isValid = false;
          }
        });
      }

      return isValid;
    } catch (er) {
      console.log(er);
      return false;
    }
  }

  sortTourSchedule() {
    this.tourModel.schedules.sort((schedule1, schedule2) => (schedule1.beginTime.valueOf() - schedule2.beginTime.valueOf()));
  }
}
