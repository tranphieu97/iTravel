
export class Category {

    public name: string;
    public link: string;
    public tags: Array<string>;

    constructor(name: string, link: string, tags: Array<string>) {
        this.name = name;
        this.link = link;
        this.tags = tags;
    }
}
