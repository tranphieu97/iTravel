export class TourSchedule {
  public _id: string;
  public beginTime: Date;
  public endTime: Date;
  public location: string;
  public tasks: string[];
  public cost: number;
  public performerIds: string[];
  public note: string;
  public isActive: Boolean;

  constructor() {
  }

  // constructor(
  //   beginTime: Date,
  //   endTime: Date,
  //   location: string,
  //   tasks: string[] = [],
  //   cost: number,
  //   performerIds: string[] = [],
  //   note: string) {
  //   this.beginTime = beginTime;
  //   this.endTime = endTime;
  //   this.location = location;
  //   this.tasks = tasks;
  //   this.cost = cost;
  //   this.performerIds = performerIds;
  //   this.note = note;
  // }
}
