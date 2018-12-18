import { Injectable } from '@angular/core';
import { Menu } from '../../model/menu.model';
import { ProvinceCity } from '../../model/province-city.model';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  isShowFullNavBar: Boolean = false;
  listProvinces: ProvinceCity[] = [];
  listMenu: Menu[];

  constructor() { }
}
