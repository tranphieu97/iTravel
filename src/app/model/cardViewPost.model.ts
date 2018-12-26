import { Location } from './location.model';

export class CardViewPost {
    _id: string;
    title: string;
    cover: string;
    categories: object[];
    createdTime: Date;
    description: string;
    location: Location;
    viewAmount: number;

    constructor(id: string, title: string, cover: string,
    categories: object[], createdTime: Date, description: string, location: Location, viewAmount: number) {
        this._id = id;
        this.title = title;
        this.cover = cover;
        this.categories = categories;
        this.createdTime = createdTime;
        this.description = description;
        this.location = location;
        this.viewAmount = viewAmount;
    }
}
