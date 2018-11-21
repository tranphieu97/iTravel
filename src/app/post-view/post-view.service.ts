import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../model/post.model';
import { PostContent } from '../model/postContent.model';
import { Category } from '../model/category.model';
import { Comment } from '../model/comment.model';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/util';
import { Subject } from 'rxjs';
import { ServerService } from '../core/services/server.service';

@Injectable({ providedIn: 'root' })
export class PostViewService {
    private HOST: String = 'http://localhost:7979/';
    posts: Post[] = [];
    // create an Observable will emit Post[] and component receive
    postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private server: ServerService) { }

    // get all posts from database
    getAllPosts() {
        this.server.getListPosts().subscribe(resData => {
            this.posts = resData.data;
            this.postsUpdated.next([...this.posts]);
        });
    }

    // used in next time
    // getOnePosts(id: string) {
    //     let post: Post;
    //     this.server.getListPosts().subscribe(resData => {
    //         post = resData.data[1];
    //     });
    //     return post;
    // }

    // send a post and store in database
    addOnePost() {
        // const post: Post = this.posts[3];
        // console.log(post);
        // this.http.post<{ message: string }>(this.HOST + 'db/posts', post)
        //     .subscribe((resData) => {
        //         console.log(resData.message);
        //     });
    }
}
