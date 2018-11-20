import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../model/post.model';
import { PostContent } from '../model/postContent.model';
import { Category } from '../model/category.model';
import { Comment } from '../model/comment.model';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/util';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostViewService {
    private HOST: String = 'http://localhost:7979/';
    posts: Post[] = [];
    // create an Observable will emit Post[] and component receive
    postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    // get all posts from database
    getAllPosts() {
        this.http.get<{ message: string; data: Post[] }>(this.HOST + 'db/posts').subscribe(resData => {
            this.posts = resData.data;
            // console.log(this.posts[2]);
            this.postsUpdated.next([...this.posts]);
        });
    }

    getOnePosts(id: string) {
        let post: Post;
        this.http.get<{ message: string; data: Post[] }>(this.HOST + 'db/posts')
            .subscribe(resData => {
                post = resData.data[2];
            });
        return post;
    }

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
