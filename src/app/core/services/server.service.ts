import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../../model/province.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Menu } from '../../model/menu.model';
import { map } from 'rxjs/operators';
import { Category } from '../../model/category.model';
import { CardViewPost } from '../../model/cardViewPost.model';
import { Feedback } from '../../model/feedback.model';
import { SearchHistory } from '../../model/searchHistory.model';
import { Post } from 'src/app/model/post.model';
import { Tag } from 'src/app/model/tag.model';
import { PostCategory } from 'src/app/model/postCategory.model';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { Location } from 'src/app/model/location.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  HOST: String = 'http://localhost:7979/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getListProvinces(): Observable<Province[]> {
    return this.http.get<any>(this.HOST + 'db/provinces/').pipe(map((res: any) => {
      const provinces: Province[] = res.data.map((resItem) => {
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

  getMenu(): Observable<Menu[]> {
    return this.http.get<any>(this.HOST + 'db/menu/').pipe(map((res: any) => {
      const menu: Menu[] = res.data.map((resItem) => {

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
          resItemCategories,
          resItem.Position
        );

        return resMenu;
      });
      return menu.sort((a, b) => a.position - b.position);
    }));
  }

  GetCardViewPost(): Observable<CardViewPost[]> {
    return this.http.get<any>(this.HOST + 'db/posts').pipe(map((res: any) => {
      const cardViewPosts: CardViewPost[] = res.data.map((resItem) => {
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

  /**
     * @author Thong
     * @description send get-request to node server for get list all Tag from Tags collection
     */
  getListTags() {
    return this.http.get<{ message: string; data: Tag[] }>(this.HOST + 'db/tags');
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all Location from Locations collection
     */
  getListLocations() {
    return this.http.get<{ message: string; data: Location[] }>(this.HOST + 'db/locations');
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all ProvinceCity from ProvinceCity collection
     */
  getListProvinceCity() {
    return this.http.get<{ message: string; data: ProvinceCity[] }>(this.HOST + 'db/province-city');
  }

  /**
     * @author Thong
     * @description send get-request to node server for list all PostCategory from PostCategories collection
     */
  getListPostCategories() {
    return this.http.get<{ message: string; data: PostCategory[] }>(this.HOST + 'db/post-categories');
  }

  /**
   * @author Thong
   * @description send get-request to node server for listAllPost from Posts collection
   */
  getListPosts() {
    return this.http.get<{ message: string; data: Post[] }>(this.HOST + 'db/posts');
  }

  /**
   * @author Thong
   * @description send get-request to query one post by Id
   */
  getOnePost(postId: string) {
    console.log(postId);
    const listParams = new HttpParams().set('postId', postId);
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ message: string, data: Post }>(this.HOST + 'api/post', { headers: this.httpOptions.headers, params: listParams });
  }

  /**
   * @author Thong
   * @description send POST-request to node server for store new post to Posts collection
   */
  postOnePost(newPost: Post) {
    return this.http.post<{ message: string }>(this.HOST + '/db/posts', newPost);
  }

  /**
   * @author Thong
   * @param {File} image
   * @description send a POST request to upload an image to server
   */
  uploadImage(image: File) {
    // convert to FormData before send to multer
    const uploadImage = new FormData();
    uploadImage.append('image', image);
    return this.http.post<{ message: string, imageUrl: string }>(this.HOST + 'upload-image', uploadImage);
  }

  postFeedback(feedback: Feedback): Observable<any> {
    return this.http.post<any>(this.HOST + 'db/create-feedback', feedback, this.httpOptions);
  }

  postSearchHistory(searchHistory: SearchHistory): Observable<any> {
    return this.http.post<any>(this.HOST + 'db/create-search-history', searchHistory, this.httpOptions);
  }

  getReportBySearchKeyWordData(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams().set('startDate', startDate.toString())
                                   .set('endDate', endDate.toString());

    return this.http.get<any>(this.HOST + 'db/report/searchkeyword', {headers: this.httpOptions.headers, params: params});
  }
}
