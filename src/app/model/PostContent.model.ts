export class PostContent {
    public _id: string;
    public title: string;
    public content: string;
    public image: string;
    public imageDesc: string;

    constructor(title: string, content: string, image: string, imageDesc: string) {
        this.title = title;
        this.content = content;
        this.image = image;
        this.imageDesc = imageDesc;
    }
}
