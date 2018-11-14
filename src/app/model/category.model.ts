export class Category {
    public name: string;
    public image: string;
    public link: string;
    public tags: Array<string>;

    constructor(name: string, img: string, link: string, tags: Array<string>) {
        this.name = name;
        this.image = img;
        this.link = link;
        this.tags = tags;
    }
}
