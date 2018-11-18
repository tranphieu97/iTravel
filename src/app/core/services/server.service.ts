import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../../model/province.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../../model/menu.model';
import { map } from 'rxjs/operators';
import { Category } from '../../model/category.model';
import { CardViewPost } from '../../model/cardViewPost.model';
import { Feedback } from '../../model/feedback.model';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  HOST: String = 'http://localhost:7979/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  GetListProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.HOST + 'db/provinces/').pipe(map((res: any[]) => {
      const provinces: Province[] = res.map((resItem) => {
        const province = new Province(
          resItem.ProvinceID,
          resItem.ProvinceName,
          resItem.District,
          resItem.MapID
        );

        return province;
      });

      return provinces;
    }));
  }

  GetMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]> (this.HOST + 'db/menu/').pipe(map((res: any[]) => {
      const menu: Menu[] = res.map((resItem) => {

        const resItemCategories: Category[] = resItem.Categories.map((resItemCategory) => {
          const category: Category = new Category(
            resItemCategory.Name,
            resItemCategory.Link,
            resItemCategory.Tags,
          );

          return category;
        });

        const resMenu = new Menu(
          resItem.Name,
          resItem.Image,
          resItem.Link,
          resItemCategories
        );

        return resMenu;
      });

      return menu;
    }));
  }

  GetCardViewPost(): Observable<CardViewPost[]> {
    return this.http.get<CardViewPost[]>(this.HOST + 'db/posts').pipe(map((res: any[]) => {
      const cardViewPosts: CardViewPost[] = res.map((resItem) => {
        const cardViewPost: CardViewPost = new CardViewPost(
          resItem._id,
          resItem.title,
          resItem.cover,
          resItem.categories,
          resItem.createdTime,
          resItem.description
        );
        return cardViewPost;
      });
      return cardViewPosts;
    }));
  }

  postFeedback(feedback: Feedback): Observable<boolean> {
    return this.http.post<boolean>(this.HOST + 'create-feedback', feedback, this.httpOptions);
  }
}
