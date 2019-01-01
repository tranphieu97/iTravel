export class PostRating {
    public _id: string;

    constructor(
        public userId: string,
        public ratingNumber: number,
        public time: Date) { }
}
