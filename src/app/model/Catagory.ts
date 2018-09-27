export class Catagory {
    public Name: string;
    public Image: string;
    public Link: string;
    public Tags: Array<string>;

    constructor(name: string, img: string, link: string, tags: Array<string>) {
        this.Name = name;
        this.Image = img;
        this.Link = link;
        this.Tags = tags;
    }
}
