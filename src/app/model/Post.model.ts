import { Category } from './category.model';
import { PostContent } from './postContent.model';

export class Post {
    constructor(
        // public id: string,
        public createdTime: Date,
        public approvedTime: Date,
        public tags: Array<string>,
        public postContents: Array<PostContent>,
        public title: string,
        public cover: string,
        public authorId: string,
        public location: Location,
        public categories: Array<Category>,
        public rating: number,
        public status: string,
        public comments: Array<Comment>,
        public description: string) { }
}
