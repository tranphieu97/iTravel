export class Notification {
    _id: string;
    from: string;
    to: string;
    content: string;
    creationTime: Date;
    isChecked: boolean;

    constructor(_id: string, from: string, to: string, content: string, creationTime: Date, isChecked: boolean) {
        this._id = _id;
        this.from = from;
        this.to = to;
        this.content = content;
        this.creationTime = creationTime;
        this.isChecked = isChecked;
    }
}
