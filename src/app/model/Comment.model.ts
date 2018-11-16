export class Comment {
    public userId: string;
    public creationTime: Date;
    public content: string;
    public like: number;
    public userLiked: Array<string>;
    public status: string;

    constructor(userId: string, creationTime: Date, content: string, like: number, userLiked: Array<string>, status: string) {
        this.userId = userId;
        this.creationTime = creationTime;
        this.content = content;
        this.like = like;
        this.userLiked = userLiked;
        this.status = status;
    }
}
