import { Category } from './Category';

export class Menu {
    public Name: string;
    public Image: string;
    public Link: string;
    public Categories: Array<Category>;

    constructor(name: string, img: string, link: string, catagories: Array<Category>) {
        this.Name = name;
        this.Image = img;
        this.Link = link;
        this.Categories = catagories;
    }
}
