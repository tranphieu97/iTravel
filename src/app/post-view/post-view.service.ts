import { Post } from '../model/post.model';

export class PostViewService {
    posts: Post[] = [
        new Post(
            new Date(),
            new Date(),
            [],
            [],
            'A very long title here',
            'https://media.defense.gov/2007/Apr/27/2000495595/780/780/0/070425-F-3961R-495.JPG',
            'userID here',
            undefined,
            [],
            5,
            'PENDING',
            [],
            'description about the post'
        ),
        new Post(
            new Date(), // createdTime: Date
            new Date(), // approvedTime: Date
            [], // tags: Array<string>
            [], // postContents: Array<PostContent>
            'A very long title here, and this is the title of post 2', // title: string
            'https://media.defense.gov/2007/Apr/27/2000495595/780/780/0/070425-F-3961R-495.JPG', // cover: string
            'userID here, author of post 2', // authorId: string
            undefined, // location: Location
            [], // categories: Array<Category>
            5, // rating: number
            'PENDING', // status: string
            [], // comments: Array<Comment>
            'description about the post' // description: string
        )
    ];
}
