import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../../model/post.model';
import { Subject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({ providedIn: 'root' })
export class PostService {
    // private HOST: String = 'http://localhost:7979/';
    // posts: Post[] = [];
    // create an Observable will emit Post[]
    // postsUpdated = new Subject<Post[]>();
    // create an Observable will emit new image when user upload new image to post
    hasNewImage = new Subject<{ imgFile: File, contentId: string }>();
    // create an Observable will emit event that an image was deleted
    hasImgDeleted = new Subject<string>();
    // Observable will emit event that categories has change
    categoryChanged = new Subject();
    // Observable will emit event that place(locationName) has change
    placeChanged = new Subject();
    // Observable will emit event that provinceCity has change
    provinceCityChanged = new Subject();
    // Observable will emit event that address has change
    addressChanged = new Subject();
    // Observable will emit event when has new alert, array string is location of message, always has length of 2
    newAlert = new Subject<string[]>();

    // constructor(private http: HttpClient, private server: ServerService) { }
    constructor(private http: HttpClient, private server: ServerService) { }
}
