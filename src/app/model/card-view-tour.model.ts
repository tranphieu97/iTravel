export class CardViewTour {
    public _id: string;
    public tourName: string;
    public registerCost: number;
    public locationIds: Array<string>;
    public beginTime: Date;
    public endTime: Date;
    public cover: string;
    public status: string;
    public closeFeedbackTime: Date;
    public closeRegisterTime: Date;
    public durationTime: number;

    constructor(_id: string, tourName: string, registerCost: number, locationIds: Array<string>, beginTime: Date,
        endTime: Date, cover: string, status: string, closeFeedbackTime: Date, closeRegisterTime: Date, durationTime: number) {
            this._id = _id;
            this.tourName = tourName;
            this.registerCost = registerCost;
            this.locationIds = locationIds;
            this.beginTime = beginTime;
            this.endTime = endTime;
            this.cover = cover;
            this.status = status;
            this.closeFeedbackTime = closeFeedbackTime;
            this.closeRegisterTime = closeRegisterTime;
            this.durationTime = durationTime;
        }
}