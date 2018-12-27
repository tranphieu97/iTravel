import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';
import { PostCategory } from 'src/app/model/postCategory.model';

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {
  allCategories: PostCategory[] = [];
  newCategoriesUpdated = new Subject();

  constructor(private http: HttpClient, private server: ServerService) { }

  getAllCategories() {
    // if (this.allCategories.length === 0) {
    this.server.getListPostCategories().subscribe((resData => {
      if (resData.data !== undefined && resData.data !== null) {
        this.allCategories = resData.data;
        this.newCategoriesUpdated.next();
      }
      // else err handling
    }));
    // }
  }
}
