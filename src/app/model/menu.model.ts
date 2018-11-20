import { Category } from './category.model';

export class Menu {
    public name: string;
    public image: string;
    public link: string;
    public categories: Category[];
    public position: number;

    constructor(name: string, img: string, link: string, categories: Category[], position: number) {
        this.name = name;
        this.link = link;
        this.image = img;
        this.categories = categories;
        this.position = position;
    }
}
