import { MenuItem } from './menu-item.model';

export class Menu {
    public name: string;
    public image: string;
    public link: string;
    public listItem: MenuItem[];
    public position: number;

    constructor(name: string, img: string, link: string, position: number) {
        this.name = name;
        this.link = link;
        this.image = img;
        this.position = position;
        this.listItem = [];
    }
}
