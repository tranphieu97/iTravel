
export class Category {

    public name: string;
    public link: string;
    public tags: string[];

    constructor(name: string, link: string, tags: string[]) {
        this.name = name;
        this.link = link;
        this.tags = tags;
    }
}
