import { Catagory } from './Catagory';

export class Menu {
    public Name: string;
    public Image: string;
    public Link: string;
    public Catagories: Array<Catagory>;

    constructor(name: string, img: string, link: string, catagories: Array<Catagory>) {
        this.Name = name;
        this.Image = img;
        this.Link = link;
        this.Catagories = catagories;
    }
}
