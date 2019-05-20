import { ConstTourPreparationStatus } from '../constants';

export class TourPreparationPerformer {
  private STATUS = new ConstTourPreparationStatus();
  public performerId: string;
  public needPrepare: number;
  public prepared: number;
  public status: string;
  // PREPARING, FINISHED

  constructor(performerId: string, needPrepare: number) {
    this.performerId = performerId;
    this.needPrepare = needPrepare;
    this.prepared = 0;
    this.status = this.STATUS.PREPARING;
  }
}
