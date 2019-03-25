import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  POST_STATUS = {
    NEW: 'NEW',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    DENY: 'DENY',
    NEED_REPAIR: 'NEED_REPAIR'
  };

  ALL_PROVINCE = 'Việt Nam';

  MENU_CATEGORIES = {
    TRAVEL: 'du lịch',
    CUISINE: 'ẩm thực',
    ONEDAY: 'trong ngày',
    ONEWEEK: 'ngắn ngày',
    MORETHANWEEK: 'dài ngày'
  };

  MENU_KIND = {
    HOT: 'hot',
    RECENT: 'recent'
  };

  constructor() { }
}
