import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardViewPost } from '../../model/cardViewPost.model';
import { Feedback } from '../../model/feedback.model';
import { SearchHistory } from '../../model/searchHistory.model';
import { Post } from 'src/app/model/post.model';
import { Tag } from 'src/app/model/tag.model';
import { PostCategory } from 'src/app/model/postCategory.model';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { Location } from 'src/app/model/location.model';
import { ConstantService } from './constant.service';
import { Comment } from 'src/app/model/comment.model';
import { PostRating } from 'src/app/model/post-rating.model';

import { environment } from '../../../environments/environment';
import { Notification } from 'src/app/model/notification.model';
import { NotificationItem } from 'src/app/model/notification-item.model';
import { Tour } from 'src/app/model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  HOST: String = 'http://localhost:7979/';
  // HOST: String = environment.apiUrl + '/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private constant: ConstantService) {
    console.log(this.HOST);
  }

  /**
   * Get list 63 VietNam's provinces
   * @name getListProvinces
   * @author phieu-th
   */
  getListProvinces(): Observable<ProvinceCity[]> {
    return this.http.get<any>(this.HOST + 'api/provinces/').pipe(map((res: any) => {
      const provinces: ProvinceCity[] = res.data.map((resItem) => {
        const province = new ProvinceCity(
          resItem._id,
          resItem.provinceId,
          resItem.provinceName,
          resItem.districts,
          resItem.regionOfCountry,
          resItem.mapId
        );

        return province;
      });

      return provinces;
    }));
  }

  /**
   * Get all post is approveded and map to card view
   * @name getCardViewPost
   * @author phieu-th
   */
  getCardViewPost(): Observable<CardViewPost[]> {
    return this.http.get<any>(this.HOST + 'api/cardview-post').pipe(map((res: any) => {
      const cardViewPosts: CardViewPost[] = res.data.map((resItem) => {
        const cardViewPost: CardViewPost = new CardViewPost(
          resItem._id,
          resItem.title,
          resItem.cover,
          resItem.categories,
          resItem.createdTime,
          resItem.description,
          resItem.location,
          resItem.viewAmount
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
    return this.http.get<{ message: string; data: Tag[] }>(this.HOST + 'api/tags');
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all Location from Locations collection
     */
  getListLocations() {
    return this.http.get<{ message: string; data: Location[] }>(this.HOST + 'api/locations');
  }

  /**
   * @author Thong
   */
  getOneLocation(locationId: string) {
    const listParams = new HttpParams().set('id', locationId);
    return this.http.get<{ message: string, data: Location }>(
      this.HOST + 'api/location',
      { headers: this.httpOptions.headers, params: listParams }
    );
  }

  /**
     * @author Thong
     * @description send get-request to node server for get list all ProvinceCity from ProvinceCity collection
     */
  getListProvinceCity() {
    return this.http.get<{ message: string; data: ProvinceCity[] }>(this.HOST + 'api/province-city');
  }

  /**
     * @author Thong
     * @description send get-request to node server for list all PostCategory from PostCategories collection
     */
  getListPostCategories() {
    return this.http.get<{ message: string; data: PostCategory[] }>(this.HOST + 'api/post-categories');
  }

  /**
   * @author Thong
   * @description send get-request to node server for listAllPost from Posts collection
   */
  getListPosts() {
    return this.http.get<{ message: string; data: Post[] }>(this.HOST + 'api/posts');
  }

  /**
   * @author Thong
   * @description send get-request to query one post by Id
   */
  getOnePost(postId: string) {
    const listParams = new HttpParams().set('postId', postId);
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ message: string, data: Post }>(this.HOST + 'api/post', { headers: this.httpOptions.headers, params: listParams });
  }

  /**
   * @author Thong
   * @description send POST-request to node server for store new post to Posts collection
   */
  postOnePost(newPost: Post) {
    return this.http.post<{ message: string, postId: string }>(this.HOST + 'user/post', newPost);
  }

  /**
     * @author Thong
     * @description send POST-request to node server for update one post by id
     */
  updateOnePost(needUpdatePost: Post) {
    return this.http.put<{ message: string, postId: string }>(this.HOST + 'user/update-post', needUpdatePost);
  }

  /**
   * @author Thong
   * @param {File} image
   * @description send a POST request to upload an image to server
   */
  uploadImage(images: { imgFile: File, contentId: string }[]) {
    // convert to FormData before send to multer
    const uploadImage = new FormData();
    // add img to FormData
    for (const img of images) {
      uploadImage.append('images', img.imgFile);
    }
    return this.http.post<{ message: string, imageUrls: string[] }>(this.HOST + 'api/upload-image', uploadImage);
  }

  /**
   * POST a feedback
   * @name postFeedback
   * @author phieu-th
   * @param feedback
   */
  postFeedback(feedback: Feedback): Observable<any> {
    return this.http.post<any>(this.HOST + 'api/create-feedback', feedback, this.httpOptions);
  }

  /**
   * POST a key word be search by user
   * @name postSearchHistory
   * @author phieu-th
   * @param searchHistory
   */
  postSearchHistory(searchHistory: SearchHistory): Observable<any> {
    return this.http.post<any>(this.HOST + 'api/create-search-history', searchHistory, this.httpOptions);
  }

  /**
   * GET data was search from startDate to endDate
   * @name getReportBySearchKeyWordData
   * @author phieu-th
   * @param startDate
   * @param endDate
   */
  getReportBySearchKeyWordData(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams().set('startDate', startDate.toString())
      .set('endDate', endDate.toString());

    return this.http.get<any>(this.HOST + 'api/report/searchkeyword', { headers: this.httpOptions.headers, params: params });
  }

  getReportByPostViewAmountData(): Observable<any> {
    return this.http.get<any>(this.HOST + 'api/report/post-view-amount');
  }

  /**
   * Get list web's policies
   * @name getPolicies
   * @author phieu-th
   */
  getPolicies(): Observable<any> {
    return this.http.get(this.HOST + 'api/policies');
  }

  /**
   * Get list posts by region name
   * @name getPostByRegion
   * @author phieu-th
   * @param region
   */
  getPostsByRegion(region: string): Observable<any> {
    const params = new HttpParams().set('region', region);
    return this.http.get(this.HOST + 'api/region-posts', { params: params }).pipe(map((res: any) => {
      const listCardViewPost: CardViewPost[] = res.data.map((resItem) => {
        const cardViewPost: CardViewPost = new CardViewPost(
          resItem._id,
          resItem.title,
          resItem.cover,
          resItem.categories,
          resItem.createdTime,
          resItem.description,
          resItem.location,
          resItem.viewAmount
        );

        return cardViewPost;
      });

      return listCardViewPost;
    }));
  }

  /**
   * Get list posts by post's category
   * @name getPostsByCategory
   * @author phieu-th
   * @param category
   */
  getPostsByCategory(categoryName: string): Observable<any> {
    const params = new HttpParams().set('category', categoryName);
    return this.http.get(this.HOST + 'api/category-posts', { params: params }).pipe(map((res: any) => {
      const listCardViewPost: CardViewPost[] = res.data.map((resItem) => {
        const cardViewPost: CardViewPost = new CardViewPost(
          resItem._id,
          resItem.title,
          resItem.cover,
          resItem.categories,
          resItem.createdTime,
          resItem.description,
          resItem.location,
          resItem.viewAmount
        );

        return cardViewPost;
      });

      return listCardViewPost;
    }));
  }

  /**
   * Get number amount post of region and all post
   */
  getPostRatioByRegion(region: string): Observable<any> {
    const params = new HttpParams().set('region', region);
    return this.http.get(this.HOST + 'api/region-ratio', { params: params });
  }

  /**
   * GET all post in database for management
   * @name getPostsByManager
   * @author phieu-th
   */
  getPostsByManager(): Observable<any> {
    return this.http.get<any>(this.HOST + 'manager/posts');
  }

  /**
   * Change a Post's status to Approved or Denied
   * @name updatePostStatus
   * @author phieu-th
   * @param postId
   * @param status
   * @param reason
   */
  updatePostStatus(postId: string, status: any, reason: string): Observable<any> {
    if (status === this.constant.POST_STATUS.APPROVED) {
      const params = {
        postId: postId,
        status: status
      };
      return this.http.patch(this.HOST + 'manager/approve-post', params);
    } else if (status === this.constant.POST_STATUS.DENY) {
      const params = {
        postId: postId,
        status: status,
        reason: reason
      };
      return this.http.patch(this.HOST + 'manager/deny-post', params);
    }
  }

  /**
   * @author Thong
   * @param postId use to find the post need add new comment
   * @param listComments use to update replace the old listComment
   */
  updatePostComments(postId: string, listComments: Comment[]) {
    const listParams = new HttpParams().set('postId', postId);
    return this.http.patch<{ message: string }>(this.HOST + 'user/send-comment', listComments,
      { headers: this.httpOptions.headers, params: listParams });
  }
  /**
   * @param postId use to find the post need add new rating
   * @param listRating use to update replace the old listRating
   */
  updatePostRating(postId: string, listRating: PostRating[]) {
    const listParams = new HttpParams().set('postId', postId);
    return this.http.patch<{ message: string }>(this.HOST + 'user/send-rating', listRating,
      { headers: this.httpOptions.headers, params: listParams });
  }
  /**
   * @param userId use to find the user to get back firstName, lastName and avatar
   */
  getUserBasicInfo(userId: string) {
    const listParams = new HttpParams().set('userId', userId);
    return this.http.get<{ message: string, data: any }>(this.HOST + 'api/user-info',
      { headers: this.httpOptions.headers, params: listParams });
  }
  /**
   * @param userId used to find the notifications of that user
   */
  getUserNotification(userId: string) {
    const listParams = new HttpParams().set('userId', userId);
    return this.http.get<{ message: string, data: any }>(this.HOST + 'user/get-notification',
      { headers: this.httpOptions.headers, params: listParams });
  }
  /**
   * @param newNotification Notification
   * @description create an empty notification for user
   */
  postNewNotification(newNotification: Notification) {
    return this.http.post<{ message: string }>(this.HOST + 'user/create-notification', newNotification);
  }
  /**
   * @param newNotification Notification
   * @description update list notification for one user
   */
  updateNotification(listNotifications: NotificationItem[]) {
    return this.http.patch<{ message: string }>(this.HOST + 'user/send-notification', listNotifications);
  }

  getTours() {
    return this.http.get<{ data: any, message: string }>(this.HOST + 'tourguide/get-tours');
  }

  getTour(tourId: string) {
    const listParams = new HttpParams().set('tourId', tourId);
    return this.http.get<{ data: any, message: string }>(this.HOST + 'api/get-tour',
      { headers: this.httpOptions.headers, params: listParams });
  }

  createTour(tour: Tour) {
    return this.http.post<{ message: string, statusCode: number }>(this.HOST + 'tourguide/create-tour', tour);
  }

  updateTour(tour: Tour) {
    return this.http.post<{ message: string }>(this.HOST + 'tourguide/update-tour', tour);
  }


  /**
   * Get user post by UserId
   * @name getPostByAuthorUser
   * @author phieu-th
   * @param userId
   */
  getPostByAuthorUser(userId: string): Observable<any> {
    const params = {
      userId: userId
    };

    return this.http.get(this.HOST + 'user/posts', { params: params });
  }

  /**
   * Get all user with their permission
   * @name getAllUserPermission
   * @author phieu-th
   */
  getAllUserPermission(): Observable<any> {
    return this.http.get(this.HOST + 'manager/users-permission');
  }

  /**
   * Update specified user's permission
   * @name updateUserPermission
   * @author phieu-th
   * @param userId
   * @param listPermission
   * @param changedBy
   */
  updateUserPermission(userId: string, listPermission: Array<any>, changedBy: string, confirmPassword: string): Observable<any> {
    const params = {
      userId: userId,
      listPermission: listPermission,
      changedBy: changedBy,
      confirmPassword: confirmPassword
    };

    return this.http.patch(this.HOST + 'manager/set-user-permission', params);
  }

  /**
   * Block account by userId, write log about block manager
   * @name blockUser
   * @author phieu-th
   * @param userId
   * @param blockReason
   * @param changedBy
   * @param confirmPassword
   */
  blockUser(userId: string, blockReason: string, changedBy: string, confirmPassword: string): Observable<any> {
    const params = {
      userId: userId,
      blockReason: blockReason,
      changedBy: changedBy,
      confirmPassword: confirmPassword
    };

    return this.http.patch(this.HOST + 'manager/block-user', params);
  }

  /**
   * Get list locations by list provinces
   * @name getLocationsInProvinces
   * @author phieu-th
   * @param arrProvincesName
   */
  getLocationsInProvinces(arrProvincesName: Array<string>): Observable<any> {
    const params = {
      arrProvincesName: arrProvincesName
    };

    return this.http.get(this.HOST + 'api/province-locations', { params: params });
  }

  /**
   * Create new location
   * @param locationName
   * @param provinceCity
   * @param gps
   * @param address
   */
  postLocation(locationName: string, provinceCity: Array<string>, gps: string, address: string, image: string): Observable<any> {
    const locationData = {
      locationName,
      provinceCity,
      gps,
      address,
      image
    };

    return this.http.post(this.HOST + 'tourguide/add-location', locationData, this.httpOptions);
  }

  /**
   * Get all user have tourguide permission
   */
  getTourguides(): Observable<any> {
    return this.http.get(this.HOST + 'tourguide/all-tourguide');
  }

  getReviewer(): Observable<any> {
    return this.http.get(this.HOST + 'tourguide/all-reviewer');
  }
}
