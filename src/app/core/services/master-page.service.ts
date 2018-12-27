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

  isShowFullNavBar: Boolean = false;
  listProvinces: ProvinceCity[] = [];
  listMenu: Menu[];

  hasChangeSelectedProvince: Subject<any> = new Subject<any>();
  selectedProvince: string;

  vnPolicies: Policy[];
  enPolicies: Policy[];

  currentLanguagePolicies: Policy[];

  searchKeyword = '';

  constructor(private server: ServerService, private language: LanguageService) {
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
}
