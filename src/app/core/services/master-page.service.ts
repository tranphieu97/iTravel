import { Injectable } from '@angular/core';
import { Menu } from '../../model/menu.model';
import { ProvinceCity } from '../../model/province-city.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  isShowFullNavBar: Boolean = false;
  listProvinces: ProvinceCity[] = [];
  listMenu: Menu[];

  hasChangeSelectedProvince: Subject<any> = new Subject<any>();
  selectedProvince: string;

  constructor() {
  }
}
