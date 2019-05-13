export class TourFeedback {
  public _id: string;
  public from: string;
  public content: string;
  public time: Date;
  public isActive: boolean;

  constructor(from: string, content: string) {
    this.from = from;
    this.content = content;
    this.time = new Date();
    this.isActive = true;
  }
}
