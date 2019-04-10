import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

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

  USER_PERMISSON = {
    MEMBER: 'Member',
    ADMIN: 'Admin',
    TOURGUIDE: 'Tour Guide'
  };

  USER_STATUS = {
    ACTIVE: 'Active',
    BLOCK: 'Block'
  };

  BLOCK_ID = {
    MPU_B01: 'MPU_B01',
    MPU_B02: 'MPU_B02',
    MPU_B03: 'MPU_B03',
  };

  constructor(private language: LanguageService) { }
}
