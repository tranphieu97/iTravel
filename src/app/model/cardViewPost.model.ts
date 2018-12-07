
export class CardViewPost {
    _id: string;
    title: string;
    cover: string;
    categories: string[];
    createdTime: Date;
    description: string;

    constructor(id: string, title: string, cover: string,
    categories: string[], createdTime: Date, description: string) {
        this._id = id;
        this.title = title;
        this.cover = cover;
        this.categories = categories;
        this.createdTime = createdTime;
        this.description = description;
    }
}
