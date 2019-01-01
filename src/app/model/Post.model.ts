import { PostCategory } from './postCategory.model';
import { PostContent } from './postContent.model';
import { Comment } from './comment.model';
import { Tag } from './tag.model';
import { Location } from './location.model';
import { PostRating } from './post-rating.model';

export class Post {
    public _id: string;

    constructor(
        public createdTime: Date,
        public approvedTime: Date,
        public tags: Array<Tag>,
        public postContents: Array<PostContent>,
        public title: string,
        public cover: string,
        public authorId: string,
        public location: Location,
        public categories: Array<PostCategory>,
        public rating: Array<PostRating>,
        public status: string,
        public comments: Array<Comment>,
        public description: string) { }
}
