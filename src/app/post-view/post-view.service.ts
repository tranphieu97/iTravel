import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../model/post.model';
import { Subject } from 'rxjs';
import { ServerService } from '../core/services/server.service';

@Injectable({ providedIn: 'root' })
export class PostViewService {
    // private HOST: String = 'http://localhost:7979/';
    posts: Post[] = [];
    // create an Observable will emit Post[]
    postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private server: ServerService) { }

    // get all posts from database
    getAllPosts() {
        this.server.getListPosts().subscribe(resData => {
            if (resData.data) {
                this.posts = resData.data;
                this.postsUpdated.next([...this.posts]);
                // toán tử ... dùng đại diện cho toàn bộ phần tử của this.posts
                // ở đây gửi đi một bản copy của posts
            }
            // else err handling
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
