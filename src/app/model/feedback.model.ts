
export class Feedback {
    name: string;
    creationDatetime: Date;
    from: string;
    content: string;
    isRead: boolean;
    isReplied: boolean;
    contact: string;
    kindOf: string;

    constructor() {
        this.name = '';
        this.creationDatetime = new Date(Date.now());
        this.from = '';
        this.content = '';
        this.isRead = false;
        this.isReplied = false;
        this.contact = '';
        this.kindOf = '';
    }
}
