import { PostContent } from './postContent.model';
import { Comment } from './comment.model';

export class Post {
    constructor(
        public id: number,
        public createdTime: Date,
        public approvedTime: Date,
        public tag: Array<string>,
        public postContents: Array<PostContent>,
        public title: string,
        public cover: string,
        public authorId: number,
        public location: Location,
        public categories: string,
        public rating: number,
        public status: string,
        public comments: Array<Comment>,
        public description: string) { }
}
