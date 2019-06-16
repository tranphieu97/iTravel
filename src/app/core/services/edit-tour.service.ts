import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { Subject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class EditTourService {

  private tour: Tour;
  private arrPerformers: Array<any> = [];
  public hasRemoveSchedule: Subject<number>;
  public hasRemovePreparation: Subject<number>;
  public hasChangeCost:  Subject<any>;

  constructor(private server: ServerService) {
    this.hasChangeCost = new Subject();
    this.hasRemovePreparation = new Subject<number>();
    this.hasRemoveSchedule = new Subject<number>();
  }

  setEditingTour(tour: Tour) {
    this.tour = tour;
    this.autoSetArrPerforms();
  }

  autoSetArrPerforms() {
    this.arrPerformers = [];
    this.server.getTourguides().subscribe((res) => {
      this.arrPerformers = res.data.map((item: any) => {
        return {
          _id: item._id,
          displayName: item.lastName === '' ? item.firstName : item.lastName + ' ' + item.firstName,
          username: item.username
        };
      });
      this.arrPerformers.sort((userA, userB) => {
        if (userA.displayName[0] < userB.displayName[0]) {
          return -1;
        } else {
          return 1;
        }
      });
    });
  }

  getMinDateCanChosen(): Date {
    try {
      return this.tour.closeFeedbackTime;
    } catch (err) {
      console.log(err);
      return new Date();
    }
  }

  getMaxDateCanChosen(): Date {
    try {
      return this.tour.endTime;
    } catch (err) {
      console.log(err);
      return new Date(2030, 1, 1);
    }
  }

  getArrPerforms(): Array<string> {
    return this.arrPerformers;
  }

  getSheduleCost(): Number {
    let cost = 0;
    if (this.tour && this.tour.schedules) {
      this.tour.schedules.forEach(schedule => {
        cost += schedule.cost;
      });
    }
    return cost;
  }

  sortTourSchedule(tour: Tour) {
    tour.schedules.sort((schedule1, schedule2) => (schedule1.beginTime.valueOf() - schedule2.beginTime.valueOf()));
  }
}
