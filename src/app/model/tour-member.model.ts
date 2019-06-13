export class TourMember {
  public _id: string;
  public memberId: string;
  public cost: number;
  public contactNumber: string;
  public registerFor: number;
  public registerNote: string;

  constructor(memberId: string, cost: number = 0, contactNumber: string) {
    this.memberId = memberId;
    this.cost = cost;
    this.contactNumber = contactNumber;
    this.registerFor = 0;
    this.registerNote = '';
  }
}
