export class NotificationItem {
    _id: string;
    from: string;
    to: string;
    content: string;
    time: Date;
    seen: boolean;
    linkTo: string;

    constructor(from: string, to: string, content: string, time: Date, seen: boolean, linkTo: string) {
        this.from = from;
        this.to = to;
        this.content = content;
        this.time = time;
        this.seen = seen;
        this.linkTo = linkTo;
    }
}
