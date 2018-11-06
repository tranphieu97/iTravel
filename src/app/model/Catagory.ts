export class Catagory {
    public Name: string;
    public Link: string;
    public Tags: Array<string>;

    constructor(name: string, link: string, tags: Array<string>) {
        this.Name = name;
        this.Link = link;
        this.Tags = tags;
    }
}
