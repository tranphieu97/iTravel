import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { Subject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class EditTourService {

  private tour: Tour;

  private arrTourPerforms: Array<any> = [];
  private arrTourMembers: Array<any> = [];
  public hasRemoveSchedule: Subject<number>;
  public hasRemovePreparation: Subject<number>;
  public hasChangeCost: Subject<any>;
  public hasEditedSuccess: Subject<any>;

  constructor(private server: ServerService) {
    this.hasChangeCost = new Subject();
    this.hasRemovePreparation = new Subject<number>();
    this.hasRemoveSchedule = new Subject<number>();
    this.hasEditedSuccess = new Subject<any>();
  }

  setEditingTour(tour: Tour) {
    this.tour = tour;
    this.autoGetTourMemberInfo();
    this.autoGetArrPerformsInfo();
  }

  autoGetArrPerformsInfo() {
    const arrTourPerformers = this.getTourPerformerIds(this.tour);

    // this.arrTourPerforms = [];
    // this.server.getTourguides().subscribe((res) => {
    //   this.arrTourPerforms = res.data.map((item: any) => {
    //     return {
    //       _id: item._id,
    //       displayName: item.lastName === '' ? item.firstName : item.lastName + ' ' + item.firstName,
    //       username: item.username
    //     };
    //   });
    //   this.arrTourPerforms.sort((userA, userB) => {
    //     if (userA.displayName[0] < userB.displayName[0]) {
    //       return -1;
    //     } else {
    //       return 1;
    //     }
    //   });

    //   this.arrTourPerforms = this.arrTourPerforms.filter(x => arrTourPerformers.includes(x._id));
    // });
    this.arrTourPerforms = arrTourPerformers.map(performerId => {
      return {
        _id: performerId,
        displayName: '',
        username: ''
      };
    });

    this.arrTourPerforms.forEach(performer => {
      this.server.getUserBasicInfo(performer._id).subscribe(res => {
        performer.displayName = res.data.lastName === '' ? res.data.firstName : res.data.lastName + ' ' + res.data.firstName;
        performer.username = res.data.username;

        this.arrTourPerforms.sort((userA, userB) => {
          if (userA.displayName[0] < userB.displayName[0]) {
            return -1;
          } else {
            return 1;
          }
        });
      });
    });
  }

  getTourPerformerIds(tour: Tour): Array<string> {
    const arrPerformers = [];
    if (tour && tour.schedules) {
      tour.schedules.forEach(schedule => {
        schedule.performerIds.forEach(performerId => {
          if (!arrPerformers.includes(performerId) && performerId !== '') {
            arrPerformers.push(performerId);
          }
        });
      });
    }
    if (tour && tour.preparations) {
      tour.preparations.forEach(preparation => {
        if (!preparation.isRequired) {
          preparation.performers.forEach(performer => {
            if (performer.needPrepare > 0 && !arrPerformers.includes(performer.performerId) && performer.performerId !== '') {
              arrPerformers.push(performer.performerId);
            }
          });
        }
      });
    }
    return arrPerformers;
  }

  getTourMemberIds(tour: Tour): Array<string> {
    const arrTourMemberIds = [];
    if (tour && tour.members) {
      tour.members.forEach(member => {
        if (!arrTourMemberIds.includes(member.memberId)) {
          arrTourMemberIds.push(member.memberId);
        }
      });
    }
    return arrTourMemberIds;
  }

  autoGetTourMemberInfo() {
    const arrTourMemberIds = this.getTourMemberIds(this.tour);

    this.arrTourMembers = arrTourMemberIds.map(memberId => {
      return {
        _id: memberId,
        displayName: '',
        username: ''
      };
    });

    this.arrTourMembers.forEach(member => {
      this.server.getUserBasicInfo(member._id).subscribe(res => {
        member.displayName = res.data.lastName === '' ? res.data.firstName : res.data.lastName + ' ' + res.data.firstName;
        member.username = res.data.username;

        this.arrTourMembers.sort((userA, userB) => {
          if (userA.displayName[0] < userB.displayName[0]) {
            return -1;
          } else {
            return 1;
          }
        });
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

  getBeginTime(): Date {
    try {
      return this.tour.beginTime;
    } catch (err) {
      console.log(err);
      return new Date(2030, 1, 1);
    }
  }

  getArrPerformsInfo(): Array<any> {
    return this.arrTourPerforms;
  }

  getArrMemberInfo(): Array<any> {
    return this.arrTourMembers;
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

  validateSchedule(tour: Tour): Boolean {
    try {
      let isValid = true;
      if (this.tour.schedules && this.tour.schedules.length > 0) {
        this.tour.schedules.forEach(schedule => {
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

  validatePreparations(tour: Tour): Boolean {
    try {
      let isValid = true;
      if (this.tour.preparations && this.tour.preparations.length > 0) {
        this.tour.preparations.forEach(preparation => {
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

  sortTourSchedule(tour: Tour) {
    tour.schedules.sort((schedule1, schedule2) => (schedule1.beginTime.valueOf() - schedule2.beginTime.valueOf()));
  }
}
