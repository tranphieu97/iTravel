import { Injectable } from '@angular/core';
import { Menu } from '../../model/menu.model';
import { ProvinceCity } from '../../model/province-city.model';
import { Subject } from 'rxjs';
import { ServerService } from './server.service';
import { Policy } from '../../model/policy.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  // For NavigationBar
  isShowFullNavBar: Boolean = false;

  // For Home page
  listProvinces: ProvinceCity[] = [];
  hasChangeSelectedProvince: Subject<any> = new Subject<any>();
  selectedProvince: string;
  listProvinceCountPost: any;
  hasListProvince: Subject<any> = new Subject<any>();

  // For Policies page
  vnPolicies: Policy[];
  enPolicies: Policy[];
  currentLanguagePolicies: Policy[];

  // For Search
  searchKeyword = '';

  constructor(private server: ServerService, private language: LanguageService) {
    this.listProvinceCountPost = [];

    this.server.getPolicies().subscribe((res) => {
      if (res) {
        this.vnPolicies = res.data.vnPolicies;
        this.enPolicies = res.data.enPolicies;
      }
      this.currentLanguagePolicies = this.enPolicies;
    });

    this.language.hasChangeLanguage.subscribe((languageCode) => {
      if (languageCode === 'vn') {
        this.currentLanguagePolicies = this.vnPolicies;
      } else if (languageCode === 'en') {
        this.currentLanguagePolicies = this.enPolicies;
      }
    });
  }

  /**
   * Set province name for counter province name in next step
   * @name setListProvinceCountPost
   * @author phieu-th
   * @param listProvinces
   */
  setListProvinceCountPost(listProvinces: any) {
    listProvinces.forEach(province => {
      this.listProvinceCountPost.push({
        provinceName: province.provinceName,
        countAmountOfPost: 0
      });
    });
    this.hasListProvince.next();
  }

  /**
   * Count amount of post for all province in list
   * @name setCountAmountOfProvincePost
   * @author phieu-th
   * @param listPost
   */
  setCountAmountOfProvincePost(listPost: any) {
    if (listPost !== undefined) {
      this.listProvinceCountPost.forEach(province => {
        province.countAmountOfPost = listPost.filter(
          post => post.location.provinceCity.indexOf(province.provinceName) !== -1).length;
      });
    }
  }
}
