import { TourPreparationPerformer } from './tour-preparation-performer.model';

export class TourPreparation {
  public _id: string;
  public itemName: string;
  public amount: number;
  public unit: string;
  public performers: TourPreparationPerformer[];
  public status: string;
  // PREPARING, FINISHED
  public deadline: Date;
  public note: string;
  public isActive: Boolean;
  public isRequired: Boolean;

  // constructor(
  //   itemName: string,
  //   amount: number,
  //   unit: string,
  //   performers: TourPreparationPerformer[],
  //   deadline: Date,
  //   note: string) {
  //   this.itemName = itemName;
  //   this.amount = amount;
  //   this.unit = unit;
  //   this.performers = performers;
  //   this.status = 'PREPARING';
  //   this.deadline = deadline;
  //   this.note = note;
  //   this.isActive = true;
  // }
  constructor() {
    this.itemName = '';
    this.amount = 0;
    this.unit = '';
    this.performers = [];
    this.status = 'PREPARING';
    this.isActive = true;
    this.isRequired = true;
  }
}
