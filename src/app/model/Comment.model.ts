export class Comment {
    public userId: string;
    public creationTime: Date;
    public content: string;
    public userLiked: Array<string>;
    public userDisliked: Array<string>;
    public replies: Array<Comment>;
    public status: string;

    constructor(userId: string, creationTime: Date, content: string, userLiked: Array<string>,
        userDisliked: Array<string>, status: string, replies: Array<Comment>) {

        this.userId = userId;
        this.creationTime = creationTime;
        this.content = content;
        this.userLiked = userLiked;
        this.userDisliked = userDisliked;
        this.replies = replies;
        this.status = status;
    }
}
